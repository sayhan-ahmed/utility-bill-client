import React from "react";
import { LuLightbulb } from "react-icons/lu";

const SmartInsights = () => {
  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* -----Left Side----- */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* dots */}
              <div className="absolute -left-6 -top-6 h-24 w-24 opacity-20 hidden sm:block">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={(i % 10) * 10}
                      cy={Math.floor(i / 10) * 10}
                      r="1.5"
                      fill="#6b7280"
                    />
                  ))}
                </svg>
              </div>

              <p className="section-title">
                <LuLightbulb />
                Smart Insights
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E2631] mt-2">
                Expert <span className="text-green-700">Pro-Tips</span>
              </h2>
            </div>

            <div className="mt-8 space-y-8">
              {/* item 1 */}
              <article className="border-b pb-8">
                <h3 className="text-xl font-semibold text-[#1E2631] leading-snug flex">
                  <span className="w-1 bg-orange-500 rounded mr-3" />
                  Optimizing Peak Hour Consumption
                </h3>
                <p className="text-gray-600 mt-3">
                  Major providers now offer dynamic pricing. Shifting heavy
                  usage tasks to off-peak slots can reduce your grid-related
                  costs by over 20% on monthly statements.
                </p>
              </article>

              {/* item 2 */}
              <article>
                <h3 className="text-xl font-semibold text-[#1E2631] leading-snug flex">
                  <span className="w-1 bg-orange-500 rounded mr-3" />
                  Consolidated Statement Management
                </h3>
                <p className="text-gray-600 mt-3">
                  Managing multiple service points is easier than ever. Link all
                  your properties to a single profile to get one unified
                  overview of your total utility footprint.
                </p>
              </article>
            </div>
          </div>

          {/* -----Right Side----- */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* card 1 */}
            <article className="group">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg"
                  alt="Kitchen electricity safety"
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">22 Dec, 2025</p>
                <h3 className="text-2xl font-semibold text-[#1E2631] leading-tight mt-1">
                  Integrating Smart Controls into Modern Kitchens
                </h3>
                <p className="text-gray-600 mt-2">
                  Kitchens represent the highest energy-density zones in a home.
                  Proper circuit monitoring ensures safety while identifying
                  phantom loads that drain your wallet.
                </p>
              </div>
            </article>

            {/* card 2 */}
            <article className="group">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg"
                  alt="Landscape lighting tips"
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">18 Dec, 2025</p>
                <h3 className="text-2xl font-semibold text-[#1E2631] leading-tight mt-1">
                  The ROI of Energy-Efficient Household Lighting
                </h3>
                <p className="text-gray-600 mt-2">
                  Transitioning to balanced LED setups reduces heat waste and
                  lowers lighting expenditure. A well-planned grid increases
                  both safety and property valuation.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartInsights;
