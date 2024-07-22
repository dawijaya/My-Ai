"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const Home = () => {
  const [transcription, setTranscription] = useState("");
  const [recognition, setRecognition] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [imageSrc, setImageSrc] = useState("default-image.gif"); // Default image
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = "id-ID"; // Set bahasa pengenalan suara ke Indonesia
      recognitionInstance.continuous = true; // Set to continuous listening
      setRecognition(recognitionInstance);
    } else {
      console.error("Browser tidak mendukung Speech Recognition API");
    }
  }, []);

  const fetchCatFact = async () => {
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      return response.data.fact; // Fakta tentang kucing
    } catch (error) {
      console.error("Error fetching cat fact:", error);
      return "Terjadi kesalahan saat mencari fakta kucing."; // Pesan default jika ada kesalahan
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
      recognition.onresult = async (event: any) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        setTranscription(transcript);
        const lowerCaseTranscript = transcript.toLowerCase();

        // Respon berdasarkan frasa yang diucapkan
        if (lowerCaseTranscript.includes("hai")) {
          const utterance = new SpeechSynthesisUtterance("Halo Tuan");
          utterance.lang = "id-ID"; // Set bahasa suara ke Indonesia
          window.speechSynthesis.speak(utterance);
          setImageSrc("hello-image.gif"); // Ganti gambar berdasarkan ucapan
        } else if (lowerCaseTranscript.includes("siapa kamu")) {
          const utterance = new SpeechSynthesisUtterance(
            "Saya adalah Dinda, Asisten yang kamu ciptakan"
          );
          utterance.lang = "id-ID"; // Set bahasa suara ke Indonesia
          window.speechSynthesis.speak(utterance);
          setImageSrc("who-are-you-image.gif"); // Ganti gambar berdasarkan ucapan
        } else if (lowerCaseTranscript.includes("apa yang bisa kamu lakukan")) {
          const utterance = new SpeechSynthesisUtterance(
            "Saya bisa membantu pekerjaan ayah"
          );
          utterance.lang = "id-ID"; // Set bahasa suara ke Indonesia
          window.speechSynthesis.speak(utterance);
          setImageSrc("what-can-you-do-image.gif"); // Ganti gambar berdasarkan ucapan
        } else if (lowerCaseTranscript.includes("kita sambung besok")) {
          const utterance = new SpeechSynthesisUtterance("Baik ayah");
          utterance.lang = "id-ID"; // Set bahasa suara ke Indonesia
          window.speechSynthesis.speak(utterance);
          setImageSrc("see-you-tomorrow-image.gif"); // Ganti gambar berdasarkan ucapan
        } else {
          setImageSrc("default-image.gif"); // Gambar default
          const catFact = await fetchCatFact();
          setAnswer(catFact);
          const utterance = new SpeechSynthesisUtterance(catFact);
          utterance.lang = "id-ID"; // Set bahasa suara ke Indonesia
          window.speechSynthesis.speak(utterance);
        }
      };
    }
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <Button
        color="primary"
        className="absolute right-20 top-5 z-50"
        onClick={toggleRecording}>
        {isRecording ? "Matikan" : "Aktifkan"}
      </Button>
      <p className="absolute text-white top-20 left-20 font-bold ">
        {transcription}
      </p>
      <img
        className="mx-auto w-1/4  "
        src="https://i.gifer.com/XDZT.gif"
        alt="Dynamic response"
      />
      <p className="absolute bottom-20 left-20 font-bold text-white ">
        {answer}
      </p>
    </div>
  );
};

export default Home;
