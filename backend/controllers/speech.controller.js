import axios from "axios";

export const extractKeywords = async (req, res) => {
  try {
    // Validate input
    const { text } = req.body;
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Text field is required and cannot be empty",
      });
    }

    // Call AI service
    const response = await axios.post("http://localhost:8000/extract", {
      text: text.trim(),
    });

    // Return extracted data exactly as AI layer returns (avoid nested wrappers)
    return res.json(response.data);
  } catch (err) {
    console.error("AI Service Error:", err.message);

    // Check if AI service is unreachable
    if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND") {
      return res.status(503).json({
        success: false,
        error: "AI service is not running. Make sure Python FastAPI is running on port 8000.",
      });
    }

    // Return generic error
    return res.status(500).json({
      success: false,
      error: err.response?.data?.error || "Failed to extract keywords",
    });
  }
};