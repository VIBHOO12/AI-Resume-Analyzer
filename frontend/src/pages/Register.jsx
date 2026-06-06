import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import { motion } from "framer-motion";
const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
const [loading, setLoading] =
  useState(false);
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleRegister = async (e) => {

  e.preventDefault();

  setLoading(true);

  try {

    await registerUser(formData);

    setLoading(false);

    toast.success(
      "Registration Successful"
    );

    navigate("/");

  } catch (error) {

    console.log(error);

    setLoading(false);

    toast.error(
      "Registration Failed"
    );
  }
};

  return (
    // <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="min-h-screen bg-slate-950 flex items-center justify-center px-4"
>
      <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Register to continue
        </p>

        <form
          className="space-y-5"
          onSubmit={handleRegister}
        >

          <div>
            <label className="text-white block mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-blue-500"
            />
          </div>

          <button
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-lg font-semibold"
>
  {
    loading
      ? "Loading..."
      : "Register"
  }
</button>

        </form>

        <p className="text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    {/* </div> */}
    </motion.div>
  );
};

export default Register;