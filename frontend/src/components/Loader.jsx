export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      <span className="text-sm text-slate-600 ml-2 font-medium">Processing...</span>
    </div>
  );
}