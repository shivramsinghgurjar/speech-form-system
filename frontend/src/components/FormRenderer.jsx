const fieldIcons = {
  name: "👤",
  email: "📧",
  phone: "📞",
  date: "📅",
};

export default function FormRenderer({ data, setData }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center border border-slate-200">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-slate-600 font-medium">No data extracted yet</p>
        <p className="text-slate-500 text-sm mt-1">Speak or enter text and click "Extract Data" to auto-fill the form</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📝</span>
        <h2 className="text-lg font-semibold text-slate-800">Extracted Data</h2>
        <span className="text-xs bg-primary text-white px-2 py-1 rounded-full ml-auto">
          {Object.keys(data).length} fields
        </span>
      </div>

      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
              <span>{fieldIcons[key] || "📌"}</span>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type={key === "email" ? "email" : key === "phone" ? "tel" : key === "date" ? "date" : "text"}
              value={value || ""}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
              placeholder={`Enter ${key}`}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}