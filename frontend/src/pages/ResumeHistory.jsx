import { useEffect, useState } from "react";

import {
  getAllResumes
} from "../services/resumeService";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const ResumeHistory = () => {

  const [resumeHistory, setResumeHistory] =
    useState([]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  const fetchResumeHistory = async () => {

    try {

      const data =
        await getAllResumes();

      setResumeHistory(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchResumeHistory();

  }, []);

  return (

    <div
      className={`min-h-screen flex
      ${darkMode
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

        <Topbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* HISTORY */}

        <div
          className={`p-8 rounded-2xl
          ${darkMode
            ? "bg-slate-900"
            : "bg-white"
          }`}
        >

          <h2 className="text-3xl font-bold mb-8">
            Resume History
          </h2>

          <div className="space-y-4">

            {
              resumeHistory.length > 0 ? (

                resumeHistory.map((resume) => (

                  <div
                    key={resume.id}
                    className="flex justify-between items-center border-b border-slate-700 pb-4"
                  >

                    <div>

                      <p className="font-semibold text-lg">
                        {resume.fileName}
                      </p>

                      <p className="text-slate-400 text-sm">
                        Resume Uploaded
                      </p>

                    </div>

                    <span className="text-green-400 font-semibold">
                      Success
                    </span>

                  </div>
                ))

              ) : (

                <p className="text-slate-400">
                  No resumes uploaded yet
                </p>
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResumeHistory;