import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => {

  return (
    <div className="w-full h-[50px] flex justify-between items-center px-6 p-4 bg-gray-900 dark:bg-gray-800 shadow-md fixed top-0 z-50">
      {/* Navbar Links */}
      <div className="flex gap-x-10">
        {NavbarData.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold text-xl"
                : "text-white dark:text-gray-300 font-medium text-xl hover:text-blue-400 transition-all"
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 transition-all"
      >
        {darkMode ? <Sun className="text-yellow-400" size={22} /> : <Moon className="text-gray-200" size={22} />}
      </button>
    </div>
  );
};

export default Navbar;
