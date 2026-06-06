import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";
import { motion }
from "framer-motion";
const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

 const handleLogin = async (e) => {

  e.preventDefault();

  setLoading(true);

  try {

    const response =
      await loginUser(formData);

    localStorage.setItem(
      "token",
      response.token
    );

    setLoading(false);

    toast.success("Login Successful");

    navigate("/dashboard");

  } catch (error) {

    console.log(error);

    setLoading(false);

    toast.error("Invalid Credentials");
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
          AI Interview Platform
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Login to continue
        </p>

        <form
          className="space-y-5"
          onSubmit={handleLogin}
        >

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
    : "Login"
}
          </button>

        </form>

        <p className="text-slate-400 text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    {/* </div> */}
    </motion.div>
  );
};

export default Login;