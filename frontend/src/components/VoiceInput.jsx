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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🎤</span>
        <h2 className="text-xl font-semibold text-slate-800">Speech Input</h2>
      </div>

      {/* Recording Status Indicator */}
      <div className="mb-4">
        {isListening ? (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-600 font-medium">Recording...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
            <span className="text-sm text-slate-500">Ready to listen</span>
          </div>
        )}
      </div>

      {/* Captured Text Display */}
      {text && (
        <div className="bg-slate-50 p-4 rounded-lg mb-4 border border-slate-200">
          <p className="text-sm text-slate-600 mb-2">
            <span className="font-semibold">Captured:</span>
          </p>
          <p className="text-slate-800 text-sm leading-relaxed italic">"{text}"</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        {!isListening ? (
          <button
            onClick={startListening}
            className="flex-1 min-w-40 bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
          >
            🎤 Start Speaking
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="flex-1 min-w-40 bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
          >
            ⏹ Stop Recording
          </button>
        )}

        <button
          onClick={handleUseText}
          disabled={!text || isListening}
          className="flex-1 min-w-40 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 font-semibold py-3 px-4 rounded-lg transition-all"
        >
          ✓ Use Text
        </button>
      </div>
    </div>
  );
}