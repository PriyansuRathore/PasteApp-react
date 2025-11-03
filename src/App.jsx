import { createHashRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const router = createHashRouter([
    { path: "/", element: <><Navbar darkMode={darkMode} setDarkMode={setDarkMode} /><Home darkMode={darkMode} /><Footer darkMode={darkMode} /></> },
    { path: "/pastes", element: <><Navbar darkMode={darkMode} setDarkMode={setDarkMode} /><Paste darkMode={darkMode} /><Footer darkMode={darkMode} /></> },
    { path: "/pastes/:id", element: <><Navbar darkMode={darkMode} setDarkMode={setDarkMode} /><ViewPaste darkMode={darkMode} /><Footer darkMode={darkMode} /></> },
    { path: "*", element: <><Navbar darkMode={darkMode} setDarkMode={setDarkMode} /><h1 className="text-center text-xl mt-10">Page Not Found</h1><Footer darkMode={darkMode} /></> } // Fallback route
  ]);

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
