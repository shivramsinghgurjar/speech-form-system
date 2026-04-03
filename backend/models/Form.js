import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  systemid: { type: String, required: true },
  rollnumber: { type: String, required: true },
  year: { type: String, required: true },
  program: { type: String, required: true },
  branch: { type: String, required: true },
  passingyear: { type: String, required: true },
  // legacy fields if needed
  email: String,
  phone: String,
  date: String,
}, { timestamps: true });

export default mongoose.model("Form", formSchema);