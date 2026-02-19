import { useState } from "react";
import type { ClassOptions } from "../types/interface";


const classOptions: ClassOptions[] = [
  "1st", "2nd", "3rd", "4th", "5th", "6th",
  "7th", "8th", "9th", "10th", "11th", "12th"
];

export default function StudentForm() {
  const [formData, setFormData] = useState({ name: "", age: "", studentClass: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.age) e.age = "Age is required";
    else if (formData.age < 3 || formData.age > 20) e.age = "Age must be between 3 and 20";
    if (!formData.studentClass) e.studentClass = "Please select a class";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputClass = (field) =>
    [
      "w-full px-3.5 py-2.5 border-2 rounded-xl text-base text-gray-900 bg-white outline-none transition-all duration-200 appearance-none",
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-blue-500"
    ].join(" ");

  const summaryRows = [
    { label: "Name", value: formData.name },
    { label: "Age", value: `${formData.age} yrs` },
    { label: "Class", value: formData.studentClass },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-lg">

        {submitted ? (
          <div className="text-center">
            {/* Check icon */}
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 text-2xl mx-auto mb-4">
              ✓
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">All done!</h2>
            <p className="text-sm text-gray-500 mb-7">Your details have been submitted.</p>

            {/* Summary */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl mb-6 text-left overflow-hidden">
              {summaryRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center px-5 py-3 text-sm ${i !== summaryRows.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className="text-gray-500 font-medium">{row.label}</span>
                  <span className="text-gray-900 font-semibold">{row.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setFormData({ name: "", age: "", studentClass: "" }); setSubmitted(false); }}
              className="w-full border-2 border-gray-200 text-gray-700 font-semibold text-sm py-3 rounded-xl hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
            >
              Submit Another
            </button>
          </div>

        ) : (
          <>
            <span className="inline-block bg-blue-50 text-blue-500 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Enrollment
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Student Registration</h1>
            <p className="text-sm text-gray-500 mb-8">Fill in the details below to register.</p>

            <form onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  id="name" name="name" type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
              </div>

              {/* Age */}
              <div className="mb-5">
                <label htmlFor="age" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Age
                </label>
                <input
                  id="age" name="age" type="number"
                  min="3" max="20"
                  placeholder="e.g. 14"
                  value={formData.age}
                  onChange={handleChange}
                  className={inputClass("age")}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1.5">{errors.age}</p>}
              </div>

              {/* Class */}
              <div className="mb-5">
                <label htmlFor="studentClass" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Class
                </label>
                <div className="relative">
                  <select
                    id="studentClass" name="studentClass"
                    value={formData.studentClass}
                    onChange={handleChange}
                    className={inputClass("studentClass")}
                  >
                    <option value="">Select class</option>
                    {classOptions.map(c => (
                      <option key={c} value={c}>{c} Class</option>
                    ))}
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm select-none">
                    ▾
                  </span>
                </div>
                {errors.studentClass && <p className="text-red-500 text-xs mt-1.5">{errors.studentClass}</p>}
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Register →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}