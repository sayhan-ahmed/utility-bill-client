import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";

export default function Root() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

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
    </div>
  );
}
