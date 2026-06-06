import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun
} from "react-icons/fa";

const Topbar = ({
  menuOpen,
  setMenuOpen,
  darkMode,
  setDarkMode,
  handleLogout
}) => {

  return (

    <>
      {/* MOBILE NAVBAR */}

      <div className="md:hidden flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold text-cyan-400">
          AI Interview
        </h1>

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          {
            menuOpen
              ? <FaTimes size={24} />
              : <FaBars size={24} />
          }

        </button>

      </div>

      {/* TOPBAR */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            Welcome back 👋
          </p>

        </div>

        <div className="flex gap-4 items-center">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="bg-slate-800 p-3 rounded-lg"
          >

            {
              darkMode
                ? <FaSun />
                : <FaMoon />
            }

          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition-all duration-300"
          >
            Logout
          </button>

        </div>

      </div>
    </>
  );
};

export default Topbar;