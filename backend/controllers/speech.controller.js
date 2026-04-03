import axios from "axios";

export const extractKeywords = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/extract",
      { text: req.body.text }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "AI service error" });
  }
};