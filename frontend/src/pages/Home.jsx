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
      
      const payload = res.data;
      const extractedData =
        payload?.data?.data || // backend wrapper + AI wrapper
        payload?.data || // backend wrapper
        payload ||
        {};

      const normalizedData = {
        name: "",
        systemid: "",
        rollnumber: "",
        year: "",
        program: "",
        branch: "",
        passingyear: "",
        ...extractedData,
      };

      console.log("Extracted data:", extractedData);

      if (Object.keys(extractedData).length > 0) {
        setFormData(normalizedData);
      } else {
        setError("❌ No extractable fields found. Try a more precise grammar like: my name is ..., system id is ..., roll number is ..., etc.");
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

    console.log('Submitting formData:', formData); // debug

    setIsLoading(true);
    setError("");
    try {
      // Ensure we push exactly the normalized format
      const payload = {
        source: "speech-form",
        transcription: text || "",
        extractedData: formData,
        name: formData.name || "",
        systemid: formData.systemid || "",
        rollnumber: formData.rollnumber || "",
        year: formData.year || "",
        program: formData.program || "",
        branch: formData.branch || "",
        passingyear: formData.passingyear || "",
      };
      console.log('saveForm payload:', payload); // debug

      const res = await saveForm(payload);

      console.log('saveForm response:', res.data); // debug

      if (res.data) {
        setSuccessMessage("✅ Form submitted successfully! Your data has been saved.");
        setTimeout(() => {
          handleClearAll();
        }, 2000);
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

  const [successMessage, setSuccessMessage] = useState("");

  // Auto-clear success after 4 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleClr = () => {
    handleClearAll();
  };

  const handleClearAll = () => {
    setText("");
    setFormData({});
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-lg text-white">🎤</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">FormAssist</h1>
              <p className="text-xs text-gray-500">AI-Powered Form Filling</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">Student Registration Form</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Smart Form Filling
          </h2>
          <p className="text-xl text-gray-600 mb-2">Simply speak your information, and AI will auto-fill your form</p>
          <p className="text-gray-500">Fast, accurate, and effortless. No typing required.</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold text-green-700">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError("")}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Speech Input & Instructions */}
          <div className="lg:col-span-1">
            {/* Speech Input Card */}
            <VoiceInput setText={setText} />

            {/* Instructions Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📋</span> How It Works
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">1</span>
                  <p><strong>Speak</strong> your information clearly</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                  <p><strong>Click "Use Text"</strong> to confirm</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">3</span>
                  <p><strong>Extract Data</strong> with AI</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">4</span>
                  <p><strong>Submit</strong> your form</p>
                </div>
              </div>

              {/* Sample Text */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Example Sentence:</p>
                <p className="text-xs text-gray-500 italic">
                  "My name is Shivram and my system id is 2023340021, roll number is 2301010822 and i am currently in 3rd year and the program is B.tech and the branch is CSE and passing year is 2027."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form & Extract Button */}
          <div className="lg:col-span-2">
            {/* Extract Data Button */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-6">
              <button
                onClick={processText}
                disabled={isLoading || !text.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <span>🔍</span>
                {isLoading ? "Extracting Data..." : "Extract Data from Text"}
              </button>
              {isLoading && <div className="mt-4"><Loader /></div>}

              {text && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Current Text:</p>
                  <p className="text-sm text-gray-700 italic">"{text}"</p>
                </div>
              )}
            </div>

            {/* Form */}
            <FormRenderer data={formData} setData={setFormData} />

            {/* Submit & Clear Buttons */}
            {Object.keys(formData).length > 0 && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="text-lg">✅</span> {isLoading ? "Submitting..." : "Submit Form"}
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={isLoading}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold py-3 px-6 rounded-lg transition-all"
                >
                  🗑️ Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Stats */}
        {text && (
          <div className="mt-12 bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {text.length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Characters Captured</p>
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {text.split(" ").length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Words Captured</p>
              </div>
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {Object.values(formData).filter(v => v && v !== "").length}/7
                </p>
                <p className="text-sm text-gray-600 mt-1">Fields Filled</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="mb-2">FormAssist © 2026 | AI-Powered Form Filling System</p>
          <p className="text-sm text-gray-500">Built with React, FastAPI, and MongoDB</p>
        </div>
      </footer>
    </div>
  );
}