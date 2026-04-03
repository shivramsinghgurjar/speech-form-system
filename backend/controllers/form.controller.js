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

    // Debug logs for incoming payload
    console.log('saveForm request body:', req.body);

    // Sometimes client sends nested payloads, normalize to actual data object
    const incomingPayload = req.body?.data || req.body;

    // Validate required fields
    const requiredFields = [
      'name',
      'systemid',
      'rollnumber',
      'year',
      'program',
      'branch',
      'passingyear',
    ];

    const missingFields = requiredFields.filter(
      (field) => !incomingPayload[field] || incomingPayload[field].toString().trim() === ''
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    // Build final document with all fields, using extracted field values if available
    const formDataToSave = {
      source: incomingPayload.source || "speech-form",
      transcription: incomingPayload.transcription || "",
      extractedData: incomingPayload.extractedData || {
        name: incomingPayload.name,
        systemid: incomingPayload.systemid,
        rollnumber: incomingPayload.rollnumber,
        year: incomingPayload.year,
        program: incomingPayload.program,
        branch: incomingPayload.branch,
        passingyear: incomingPayload.passingyear,
      },
      name: incomingPayload.name || "",
      systemid: incomingPayload.systemid || "",
      rollnumber: incomingPayload.rollnumber || "",
      year: incomingPayload.year || "",
      program: incomingPayload.program || "",
      branch: incomingPayload.branch || "",
      passingyear: incomingPayload.passingyear || "",
      // preserve legacy fields if present
      email: incomingPayload.email || "",
      phone: incomingPayload.phone || "",
      date: incomingPayload.date || "",
    };

    const savedForm = await Form.create(formDataToSave);

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