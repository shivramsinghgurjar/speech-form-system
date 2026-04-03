import Form from "../models/Form.js";

export const saveForm = async (req, res) => {
  try {
    // Validate input
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Form data is required",
      });
    }

    // Create and save form
    const form = new Form(req.body);
    const savedForm = await form.save();

    return res.json({
      success: true,
      data: savedForm,
      message: "Form saved successfully",
    });
  } catch (err) {
    console.error("Save Error:", err.message);

    return res.status(500).json({
      success: false,
      error: err.message || "Failed to save form",
    });
  }
};