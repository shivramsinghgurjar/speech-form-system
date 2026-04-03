import { useSpeech } from "../hooks/useSpeech";

export default function VoiceInput({ setText }) {
  const { text, isListening, startListening, stopListening } = useSpeech();

  const handleUseText = () => {
    if (!text.trim()) {
      alert("📢 Please speak something first!");
      return;
    }
    setText(text);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">🎤</span>
        <h2 className="text-lg font-bold text-gray-800">Speech Input</h2>
      </div>

      {/* Recording Status Indicator */}
      <div className="mb-5">
        {isListening ? (
          <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-600 font-semibold">🔴 Recording...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-600 font-medium">Ready to listen</span>
          </div>
        )}
      </div>

      {/* Captured Text Display */}
      {text && (
        <div className="bg-blue-50 p-4 rounded-lg mb-5 border border-blue-200">
          <p className="text-xs font-semibold text-gray-600 mb-2">
            📝 Captured Text:
          </p>
          <p className="text-gray-800 text-sm leading-relaxed italic">"{ text}"</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {!isListening ? (
          <button
            onClick={startListening}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            🎤 Start Speaking
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            ⏹ Stop Recording
          </button>
        )}

        <button
          onClick={handleUseText}
          disabled={!text || isListening}
          className="w-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold py-3 px-4 rounded-lg transition-all"
        >
          ✓ Use Text
        </button>
      </div>
    </div>
  );
}