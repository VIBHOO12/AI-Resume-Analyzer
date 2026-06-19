import { Link } from "react-router-dom";
import {
  FaRobot,
  FaFileAlt,
  FaChartLine
} from "react-icons/fa";

const Sidebar = ({
  menuOpen,
  setMenuOpen,
  darkMode
}) => {

  return (

    <div
      className={`w-64 p-6 flex flex-col justify-between shadow-2xl h-screen
      ${menuOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 fixed md:static z-50 transition-all duration-300
      ${darkMode ? "bg-slate-900" : "bg-white"}
      `}
    >

      <div>

        {/* LOGO */}

        <div className="flex items-center gap-3 mb-12">

          <FaRobot className="text-cyan-400 text-4xl" />

          <h1
            className={`text-2xl font-bold
            ${darkMode ? "text-white" : "text-black"}
            `}
          >
            AI Interview
          </h1>

        </div>

        {/* NAVIGATION */}

        <ul className="space-y-4">

          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
          >

            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-all duration-300 cursor-pointer">

              <FaChartLine className="text-green-400 text-xl" />

              <span className="font-medium">
                Dashboard
              </span>

            </li>

          </Link>

          <Link
            to="/ai-questions"
            onClick={() => setMenuOpen(false)}
          >

            <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300 cursor-pointer">

              <FaRobot className="text-cyan-400 text-xl" />

              <span className="font-medium">
                AI Questions
              </span>

            </li>

          </Link>
                <Link
  to="/resume-history"
  onClick={() => setMenuOpen(false)}
>

  <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 hover:text-green-400 transition-all duration-300 cursor-pointer">

    <FaFileAlt className="text-blue-400 text-xl" />

    <span className="font-medium">
      Resume History
    </span>

  </li>

</Link>
          {/* <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition-all duration-300 cursor-pointer">

            <FaFileAlt className="text-blue-400 text-xl" />

            <span className="font-medium">
              Resume Upload
            </span>

          </li> */}

        </ul>

      </div>

      {/* FOOTER */}

      <div
        className={`p-4 rounded-xl mt-10
        ${darkMode ? "bg-slate-800" : "bg-slate-200"}
        `}
      >

        <p className="text-slate-400 text-sm">
          AI Powered Resume Platform
        </p>

      </div>

    </div>
  );
};

export default Sidebar;
