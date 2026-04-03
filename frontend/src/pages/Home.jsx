import { useState } from "react";
import VoiceInput from "../components/VoiceInput";
import FormRenderer from "../components/FormRenderer";
import { extractKeywords, saveForm } from "../services/api";

export default function Home() {
  const [text, setText] = useState("");
  const [formData, setFormData] = useState({});

  const processText = async () => {
  if (!text) return alert("Please speak first");

  const res = await extractKeywords(text);
  setFormData(res.data);
};

  const handleSubmit = async () => {
    await saveForm(formData);
    alert("Form Saved!");
  };

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-4">Speech Form System</h1>

      <VoiceInput setText={setText} />

      <button onClick={processText} className="mt-3 bg-purple-500 text-white px-4 py-2">
        Extract Data
      </button>

      <FormRenderer data={formData} setData={setFormData} />

      <button onClick={handleSubmit} className="mt-3 bg-black text-white px-4 py-2">
        Submit
      </button>
    </div>
  );
}