import React, { useState, useEffect } from "react";
import Category from "./Category";
import Slider from "./Slider";
import NewsSection from "./NewsSection";
import Service from "./Service";
import RecentBills from "./RecentBills";
import { FiMoon, FiSun } from "react-icons/fi";

const Home = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    console.log("Theme switched to:", theme);
  }, [theme]);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Theme Toggle Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-colors ${
            theme === "dark"
              ? "bg-gray-800 text-yellow-300 hover:bg-gray-700"
              : "bg-white text-gray-800 hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? (
            <FiSun className="w-6 h-6" />
          ) : (
            <FiMoon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <Slider theme={theme} />
      <RecentBills theme={theme} />
      <NewsSection theme={theme} />
      <Category theme={theme} />
      <Service theme={theme} />
    </div>
  );
};

export default Home;
