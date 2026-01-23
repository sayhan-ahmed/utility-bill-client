import React from "react";
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

const Home = () => {
  return (
    <div className="min-h-screen scroll-smooth bg-gray-100">
      {/* Main Content */}
      <Slider />
      <Features />
      <SmartAudit />
      <div id="statistics">
        <RecentBills />
      </div>
      <SmartInsights />
      <Category />
      <Benefits />
      <Comparison />
      <Testimonials />
      <FAQ />
      <div id="contact">
        <Service />
      </div>
    </div>
  );
};

export default Home;
