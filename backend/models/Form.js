import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  source: { type: String, default: 'speech-form' },
  transcription: { type: String, default: '' },
  extractedData: { type: mongoose.Schema.Types.Mixed, default: {} },
  name: { type: String, required: true },
  systemid: { type: String, required: true },
  rollnumber: { type: String, required: true },
  year: { type: String, required: true },
  program: { type: String, required: true },
  branch: { type: String, required: true },
  passingyear: { type: String, required: true },
  // legacy fields
  email: String,
  phone: String,
  date: String,
}, { timestamps: true });

export default mongoose.model("Form", formSchema);