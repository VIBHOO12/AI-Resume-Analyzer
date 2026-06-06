import { useState, useEffect } from "react";
import { generateATSReport } from "../services/atsService";
import {
  uploadResume,
  getAllResumes
} from "../services/resumeService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import ATSChart from "../components/ATSChart";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import {
  FaRobot,
  FaFileAlt,
  FaChartLine,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";
const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [uploadedResume, setUploadedResume] = useState("");
  const [resumeId, setResumeId] = useState(null);
  const navigate = useNavigate();
  const [atsReport, setATSReport] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [resumeHistory, setResumeHistory] =
  useState([]);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      // alert("Please select a file");
      toast.error("Please select a file");

      return;
    }

    try {
      const response = await uploadResume(selectedFile);

      console.log(response);

      setUploadedResume(response.fileName);

      setResumeId(response.id);

      toast.success("Resume Uploaded Successfully");
      fetchResumeHistory();
    } catch (error) {
      console.log(error);

      toast.error("Upload Failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  const handleGenerateATS = async () => {
    if (!resumeId) {
      toast.error("Upload resume first");

      return;
    }

    try {
      const response = await generateATSReport(resumeId);

      console.log(response);

      setATSReport(response);

      toast.success("ATS Report Generated");
    } catch (error) {
      console.log(error);

      toast.error("ATS Generation Failed");
    }
  };
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
    // <div className="min-h-screen bg-slate-950 text-white flex">
    <div
      className={`min-h-screen flex transition-all duration-300
  ${darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-black"}`}
    >
      {/* SIDEBAR */}

      {/* <div className="w-64 bg-slate-900 p-6 hidden md:flex flex-col justify-between shadow-2xl"> */}
     <Sidebar
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  darkMode={darkMode}
/>

      {/* MAIN */}

      <div className="flex-1 p-6">
        {/* MOBILE NAVBAR */}

      
        {/* TOPBAR */}

    <Topbar
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  handleLogout={handleLogout}
/>
        {/* CARDS */}

        <div className="grid md:grid-cols-3 gap-6">
          <div
            className={`p-6 rounded-2xl ${darkMode ? "bg-slate-900" : "bg-white"}`}
          >
            <h2 className="text-slate-400 mb-3">ATS Score</h2>

            <p className="text-5xl font-bold text-green-400">
              {atsReport ? `${atsReport.score}%` : "0%"}
            </p>
          </div>

          {/* <div className="bg-slate-900 p-6 rounded-2xl"> */}
          <div
            className={`p-6 rounded-2xl
  ${darkMode ? "bg-slate-900" : "bg-white"}
`}
          >
            <h2 className="text-slate-400 mb-3">Uploaded Resume</h2>

            <p className="text-xl font-semibold">
              {uploadedResume || "No Resume"}
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl ${darkMode ? "bg-slate-900" : "bg-white"}`}
          >
            <h2 className="text-slate-400 mb-3">AI Questions</h2>

            <p className="text-5xl font-bold text-blue-400">25</p>
          </div>
        </div>

        {/* UPLOAD */}

        <div
          className={`mt-10 p-8 rounded-2xl ${darkMode ? "bg-slate-900" : "bg-white"}`}
        >
          <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>

          <p className="text-slate-400 mb-6">Upload resume for ATS analysis</p>

          <div className="border-2 border-dashed border-slate-700 p-10 rounded-xl text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mb-5"
            />

            <br />

            <button
              onClick={handleUpload}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300"
            >
              Upload Resume
            </button>

            <button
              onClick={handleGenerateATS}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg ml-4"
            >
              Generate ATS
            </button>
          </div>
        </div>

        {atsReport && (
          <div
            className={`mt-10 p-8 rounded-2xl ${darkMode ? "bg-slate-900" : "bg-white"}`}
          >
            <h2 className="text-2xl font-bold mb-6">ATS Report</h2>

            <div className="space-y-6">
              <div>
                <p className="text-slate-400 mb-2">ATS Score</p>

                <div className="w-full bg-slate-700 h-5 rounded-full">
                  <div
                    className="bg-green-500 h-5 rounded-full"
                    style={{
                      width: `${atsReport.score}%`,
                    }}
                  ></div>
                </div>

                <p className="mt-2 text-green-400 font-bold">
                  {atsReport.score}%
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Missing Skills</h3>

                <p className="text-slate-300">{atsReport.missingSkills}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Suggestions</h3>

                <p className="text-slate-300">{atsReport.suggestions}</p>
              </div>
            </div>
          </div>
        )}

        <ATSChart />
      </div>
    </div>
  );
};

export default Dashboard;
