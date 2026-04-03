export default function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-50 border border-red-200 rounded-lg flex items-start justify-between gap-4 shadow-sm">
      <div className="flex items-start gap-3 flex-1">
        <span className="text-xl mt-1">⚠️</span>
        <p className="text-red-700 font-medium text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-red-400 hover:text-red-600 font-bold text-lg transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}
