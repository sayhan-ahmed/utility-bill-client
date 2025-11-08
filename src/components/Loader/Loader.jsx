import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        className="w-24 h-24"
      >
        {/* Outer rotating circle */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#05A610"
          strokeWidth="4"
          strokeDasharray="340"
          className="animate-spin-slow opacity-20"
        />

        {/* Centered “B” Path */}
        <path
          d="
            M45,30
            L65,30
            Q80,30 80,45
            Q80,55 65,55
            L45,55
            M65,55
            Q80,55 80,70
            Q80,85 65,85
            L45,85
            L45,30
          "
          fill="none"
          stroke="#16a34a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="300"
          strokeDashoffset="300"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="300"
            to="0"
            dur="1.8s"
            repeatCount="indefinite"
            begin="0s"
          />
        </path>
      </svg>

      {/* Loading text with animated dots */}
      <div className="text-[#16a34a] font-bold tracking-wide">
        <span className="pl-5">Loading</span>
        <span className="inline-flex w-6 justify-between ml-1 align-middle">
          <span className="dot" />
          <span className="dot" style={{ animationDelay: "0.18s" }} />
          <span className="dot" style={{ animationDelay: "0.36s" }} />
        </span>
      </div>
      <style>
        {`
          @keyframes dotBlink {
            0%, 20%   { opacity: 0; transform: translateY(0); }
            30%, 60%  { opacity: 1; transform: translateY(-1px); }
            100%      { opacity: 0; transform: translateY(0); }
          }
          .dot {
            width: 0.3rem;
            height: 0.3rem;
            border-radius: 9999px;
            background: #16a34a;
            display: inline-block;
            animation: dotBlink 1.2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
