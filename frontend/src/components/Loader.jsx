export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      <span className="text-sm text-gray-600 ml-2 font-medium">Loading...</span>
    </div>
  );
}