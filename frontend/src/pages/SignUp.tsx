import { useState } from "react";
import type { ClassOptions } from "../types/interface";
import { Link, useNavigate } from "react-router-dom";
import { postSignUpCred } from "../apis/auth";


const classOptions: ClassOptions[] = [
  "1st", "2nd", "3rd", "4th", "5th", "6th",
  "7th", "8th", "9th", "10th", "11th", "12th"
];

interface FormError {
  name?: string,
  age?: string,
  class?: string
}
interface FormData {
  name: string,
  age: number,
  class: string
}
export default function StudentForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", age: 15, class: "" });
  const [errors, setErrors] = useState<FormError>({});
  const navigate = useNavigate();
  const validate = () => {
    const e: FormError = {};
    if (!formData.name.trim() || formData.name.includes(" ")) e.name = "Name is required";
    if (!formData.age) e.age = "Age is required";
    else if (formData.age < 3 || formData.age > 20) e.age = "Age must be between 3 and 20";
    if (!formData.class) e.class = "Please select a class";
    return e;
  };

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement, HTMLInputElement> |  React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors.name) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    console.log(formData)
    const res = await postSignUpCred(formData);
    alert(res.message)
    if(res.status === "success"){
      navigate("/quiz")
    }
  };

  const inputClass = (field: "name" | "class" | "age") =>
    [
      "w-full px-3.5 py-2.5 border-2 rounded-xl text-base text-gray-900 bg-white outline-none transition-all duration-200 appearance-none",
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-blue-500"  
    ].join(" ");

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-lg">
          <>
            {/* <span className="inline-block bg-blue-50 text-blue-500 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Enrollment
            </span> */}
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Registration</h1>
            <p className="text-sm text-gray-500 mb-8">Fill in the details below to register.</p>

            <form onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  id="name" name="name" type="text"
                  placeholder="e.g. AaravSharma"
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
                <label htmlFor="class" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Class
                </label>
                <div className="relative">
                  <select
                    id="class" name="class"
                    value={formData.class}
                    onChange={handleChange}
                    className={inputClass("class")}
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
                {errors.class && <p className="text-red-500 text-xs mt-1.5">{errors.class}</p>}
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Register →
              </button>
            </form>
            <Link to={"/login"}>
              <button
              className="w-full mt-2 border-2 text-blue-500 border-blue-500 hover:border-blue-600 hover:text-blue-600 font-semibold text-base py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Already have account?
              </button>
            </Link>
          </>
      </div>
    </div>
  );
}