import Form from "../models/Form.js";

export const saveForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};