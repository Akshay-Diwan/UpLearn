import { useState } from "react";
import { login } from "../apis/auth";
import { Link, useNavigate} from "react-router-dom";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<string | null>(null);
  const navigate = useNavigate()
  
  const validate = (): string | null =>  {
    let err = null;
    if(name.trim().length == 0) err = "Name cannot be blank";
    return err;
    
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const err = validate();
    if (err) { setErrors(err); return; }
    console.log(name)

    const res = await login({name});
    alert(res.message);
    if(res.status === "success")
        console.log("Sucess!")
        navigate("/quiz", {replace: true})
  };

  const inputClass = () =>
    [
      "w-full px-3.5 py-2.5 border-2 rounded-xl text-base text-gray-900 bg-white outline-none transition-all duration-200 appearance-none",
      errors
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Login</h1>
            <p className="text-sm text-gray-500 mb-8">Fill in the details below to login.</p>


              {/* Name */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Enter your Username
                </label>
                <input
                  id="name" name="name" type="text"
                  placeholder="e.g. AaravSharma"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  className={inputClass()}
                />
                {errors && <p className="text-red-500 text-xs mt-1.5">{errors}</p>}
              </div>
              <button
                onClick={handleSubmit}
                className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Login →
              </button>
              <Link to="/signup"
              >
                <button
                className="w-full mt-2 border-2 text-blue-500 border-blue-500 hover:border-blue-600 hover:text-blue-600 font-semibold text-base py-3 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                New To Platform
                </button>
              </Link>
          </>
      </div>
    </div>
  );
}