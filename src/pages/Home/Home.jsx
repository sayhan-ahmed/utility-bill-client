import React, { useContext } from "react";
import Category from "./Category";
import Slider from "./Slider";
import SmartInsights from "./SmartInsights";
import Service from "./Service";
import RecentBills from "./RecentBills";
import Features from "./Features";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import SmartAudit from "./SmartAudit";
import Benefits from "./Benefits";
import Comparison from "./Comparison";
import { ThemeContext } from "../../provider/ThemeProvider";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen scroll-smooth ${
        theme === "dark" ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Main Content */}
      <Slider theme={theme} />
      <Features />
      <SmartAudit />
      <div id="statistics">
        <RecentBills theme={theme} />
      </div>
      <SmartInsights theme={theme} />
      <Category theme={theme} />
      <Benefits />
      <Comparison />
      <Testimonials />
      <FAQ />
      <div id="contact">
        <Service theme={theme} />
      </div>
    </div>
  );
};

export default Home;
