import { useState, useEffect } from "react";
import VoiceInput from "../components/VoiceInput";
import FormRenderer from "../components/FormRenderer";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { extractKeywords, saveForm } from "../services/api";

export default function Home() {
  const [text, setText] = useState("");
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-clear errors after 4 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const processText = async () => {
    if (!text.trim()) {
      setError("📢 Please speak or type something first!");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const res = await extractKeywords(text);
      
      if (res.data && typeof res.data === "object") {
        setFormData(res.data);
      } else {
        setError("❌ Invalid response format from AI service");
      }
    } catch (err) {
      console.error("Extract error:", err);
      setError(
        err.response?.data?.error || 
        err.message || 
        "❌ Failed to extract data. Make sure the AI module is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData || Object.keys(formData).length === 0) {
      setError("📋 Please extract data first!");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const res = await saveForm(formData);
      
      if (res.data) {
        alert("✅ Form saved successfully!");
        handleClearAll();
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(
        err.response?.data?.error || 
        err.message || 
        "❌ Failed to save form. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    if (text || Object.keys(formData).length > 0) {
      if (confirm("🗑️ Clear all data? This cannot be undone.")) {
        setText("");
        setFormData({});
        setError("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            🎤 Speech Form System
          </h1>
          <p className="text-slate-600">
            Speak your info and let AI auto-fill your form
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError("")}
          />
        )}

        {/* Speech Input Section */}
        <VoiceInput setText={setText} />

        {/* Extract Button */}
        <div className="mb-6">
          <button
            onClick={processText}
            disabled={isLoading || !text.trim()}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
          >
            {isLoading ? "⏳ Extracting..." : "🔍 Extract Data"}
          </button>
          {isLoading && <Loader />}
        </div>

        {/* Form Section */}
        <FormRenderer data={formData} setData={setFormData} />

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <button
            onClick={handleSubmit}
            disabled={isLoading || Object.keys(formData).length === 0}
            className="flex-1 min-w-40 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
          >
            {isLoading ? "💾 Saving..." : "✅ Submit"}
          </button>

          <button
            onClick={handleClearAll}
            disabled={isLoading}
            className="flex-1 min-w-40 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Status Info */}
        <div className="mt-6 text-center text-sm text-slate-600">
          <p>
            💾 Fields: <span className="font-semibold">{Object.keys(formData).length}</span> | 🗣️ Text: <span className="font-semibold">{text.length} chars</span>
          </p>
        </div>
      </div>
    </div>
  );
}