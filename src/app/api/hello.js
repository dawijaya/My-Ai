// pages/api/hello.js

export default function handler(req, res) {
  if (req.method === "GET") {
    const { greeting } = req.query;
    if (greeting === "hai") {
      res.status(200).json({ response: "hello ayah" });
    } else {
      res.status(200).json({ response: "salam tidak dikenal" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
