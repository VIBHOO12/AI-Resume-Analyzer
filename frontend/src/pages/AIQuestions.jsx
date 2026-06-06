import { useState } from "react";

import { askAI } from "../services/aiService";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FaRobot,
  FaCode,
  FaUserTie
} from "react-icons/fa";

const AIQuestions = () => {

  const [prompt, setPrompt] =
    useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  const handleGenerate = async () => {

    if (!prompt) {

      toast.error("Enter prompt");

      return;
    }

    try {

      setLoading(true);

      const result =
        await askAI(prompt);

      setResponse(result);

      setLoading(false);

      toast.success("Questions Generated");

    } catch (error) {

      console.log(error);

      setLoading(false);

      toast.error("AI Generation Failed");
    }
  };

  return (

    <div
      className={`min-h-screen flex
      ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-black"
      }`}
    >

      {/* SIDEBAR */}

      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        darkMode={darkMode}
      />

      {/* MAIN */}

      <div className="flex-1 p-6">

        {/* TOPBAR */}

        <Topbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          handleLogout={handleLogout}
        />

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}

          <div className="mb-10">

            <h1 className="text-4xl font-bold mb-3">
              AI Interview Questions
            </h1>

            <p className="text-slate-400">
              Generate technical & HR interview questions instantly
            </p>

          </div>

          {/* QUICK PROMPTS */}

          <div className="grid md:grid-cols-3 gap-4 mb-8">

            {/* JAVA */}

            <button
              onClick={() =>
                setPrompt(
                  "Generate Java Spring Boot interview questions for fresher"
                )
              }
              className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-left transition-all duration-300"
            >

              <FaCode className="text-cyan-400 text-2xl mb-3" />

              <p className="font-semibold">
                Java + Spring Boot
              </p>

            </button>

            {/* REACT */}

            <button
              onClick={() =>
                setPrompt(
                  "Generate React frontend interview questions"
                )
              }
              className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-left transition-all duration-300"
            >

              <FaRobot className="text-green-400 text-2xl mb-3" />

              <p className="font-semibold">
                React Frontend
              </p>

            </button>

            {/* HR */}

            <button
              onClick={() =>
                setPrompt(
                  "Generate HR interview questions for software engineer"
                )
              }
              className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-left transition-all duration-300"
            >

              <FaUserTie className="text-yellow-400 text-2xl mb-3" />

              <p className="font-semibold">
                HR Interview
              </p>

            </button>

          </div>

          {/* INPUT SECTION */}

          <div
            className={`p-6 rounded-2xl
            ${
              darkMode
                ? "bg-slate-900"
                : "bg-white"
            }`}
          >

            <textarea
              rows="6"
              placeholder="Generate interview questions..."
              value={prompt}
              onChange={(e) =>
                setPrompt(e.target.value)
              }
              className={`w-full p-4 rounded-xl outline-none border
              ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-slate-100 border-slate-300 text-black"
              }`}
            ></textarea>

            <button
              onClick={handleGenerate}
              className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300"
            >

              {
                loading
                  ? "Generating..."
                  : "Generate Questions"
              }

            </button>

          </div>

          {/* RESPONSE */}

          {
            response && (

              <div
                className={`mt-10 p-8 rounded-2xl
                ${
                  darkMode
                    ? "bg-slate-900"
                    : "bg-white"
                }`}
              >

                <h2 className="text-2xl font-bold mb-6">
                  AI Generated Questions
                </h2>

                <div
                  className={`p-6 rounded-xl whitespace-pre-wrap leading-8
                  ${
                    darkMode
                      ? "bg-slate-800 text-slate-200"
                      : "bg-slate-100 text-black"
                  }`}
                >

                  {response}

                </div>

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
};

export default AIQuestions;