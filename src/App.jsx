import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Navbar from "./components/Navbar";

function App() {
  // Keep dark mode state in App.jsx
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

  const router = createBrowserRouter([
    { path: "/", element: <><Navbar /><Home /></> },
    { path: "/pastes", element: <><Navbar /><Paste /></> },
    { path: "/pastes/:id", element: <><Navbar /><ViewPaste /></> }
  ]);

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
