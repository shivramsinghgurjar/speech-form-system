export default function FormRenderer({ data, setData }) {
  // Fixed form template fields
  const formFields = [
    { key: "name", label: "Full Name", type: "text", icon: "👤", required: true },
    { key: "systemid", label: "System ID", type: "text", icon: "🆔", required: true },
    { key: "rollnumber", label: "Roll Number", type: "text", icon: "📝", required: true },
    { key: "year", label: "Current Year", type: "select", icon: "📅", required: true, options: ["1st Year", "2nd Year", "3rd Year", "4th Year"] },
    { key: "program", label: "Program", type: "select", icon: "🎓", required: true, options: ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "BCA", "MCA"] },
    { key: "branch", label: "Branch", type: "select", icon: "🔧", required: true, options: ["CSE", "ECE", "ME", "CE", "EE", "IT"] },
    { key: "passingyear", label: "Passing Year", type: "number", icon: "🏆", required: true },
  ];

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-100">
        <p className="text-5xl mb-3 animate-pulse">📋</p>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">No Data Extracted Yet</h3>
        <p className="text-slate-500 text-sm">Speak your information and click "Extract Data" to auto-fill the form</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <span>📝</span> Student Information Form
          <span className="ml-auto text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full">
            {Object.values(data).filter(v => v && v !== "").length}/{formFields.length} fields
          </span>
        </h2>
        <p className="text-slate-500 text-sm mt-2">Fill in your information or let AI auto-fill it</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map(({ key, label, type, icon, required, options }) => (
          <div key={key} className={type === "select" || key === "passingyear" ? "md:col-span-1" : ""}>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>

            {type === "select" ? (
              <select
                value={data[key] || ""}
                onChange={(e) => setData({ ...data, [key]: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-slate-700 font-medium"
              >
                <option value="">Select {label}...</option>
                {options && options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                value={data[key] || ""}
                onChange={(e) => setData({ ...data, [key]: e.target.value })}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-700 font-medium"
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Completion Status */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">
            <strong>{Object.values(data).filter(v => v && v !== "").length}</strong> of <strong>{formFields.length}</strong> fields completed
          </span>
          <div className="flex gap-2">
            {formFields.map(({ key }) => (
              <div
                key={key}
                className={`w-2 h-2 rounded-full transition-all ${
                  data[key] && data[key] !== "" ? "bg-green-500" : "bg-slate-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
        <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(Object.values(data).filter(v => v && v !== "").length / formFields.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}