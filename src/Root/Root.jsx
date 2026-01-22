import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import { ThemeContext } from "../provider/ThemeProvider";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Root() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {loading && <Loader />}
      <header>
        <Navbar />
      </header>
      <main className="flex-1 pt-18 md:pt-20">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>

      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 bg-white text-slate-800 hover:bg-slate-100 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
          title="Toggle Theme"
        >
          {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
        </button>
      </div>
    </div>
  );
}
