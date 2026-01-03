import React, { useContext } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router";
import AuthContext from "../../provider/AuthContext";
import {
  FiZap,
  FiDroplet,
  FiWifi,
  FiShield,
  FiActivity,
  FiArrowRight,
  FiWind,
  FiLayers,
} from "react-icons/fi";
import { FaGripfire } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";

const UltraPremiumCard = ({ Icon, title, color, action }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const colorStyles = {
    emerald: {
      border: "group-hover:border-emerald-500/40",
      glow: "from-emerald-500/20",
      icon: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      iconHover: "group-hover:bg-emerald-500",
      text: "group-hover:text-emerald-400",
      ping: "bg-emerald-500/50",
      beam: "via-emerald-400/10",
      accent: "via-emerald-500/40",
    },
    blue: {
      border: "group-hover:border-blue-500/40",
      glow: "from-blue-500/20",
      icon: "text-blue-500",
      iconBg: "bg-blue-500/10",
      iconHover: "group-hover:bg-blue-500",
      text: "group-hover:text-blue-400",
      ping: "bg-blue-500/50",
      beam: "via-blue-400/10",
      accent: "via-blue-500/40",
    },
  };

  const style = colorStyles[color];

  return (
    <div className="perspective-[1000px]">
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`p-6 rounded-4xl bg-slate-950/40 border border-white/10 ${style.border} transition-colors group overflow-hidden relative shadow-2xl backdrop-blur-xl cursor-crosshair`}
      >
        {/* Cursor Specular Glint */}
        <motion.div
          style={{
            background: useTransform(
              [x, y],
              ([lx, ly]) =>
                `radial-gradient(600px circle at ${lx + 150}px ${
                  ly + 100
                }px, rgba(255,255,255,0.06), transparent 40%)`
            ),
          }}
          className="absolute inset-0 pointer-events-none z-10"
        />

        {/* Holographic Backlight */}
        <div
          className={`absolute -inset-1 bg-linear-to-br ${style.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10`}
        />

        {/* Parallax Internal Grid */}
        <motion.div
          style={{
            x: useTransform(x, (v) => v * -0.1),
            y: useTransform(y, (v) => v * -0.1),
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "15px 15px",
          }}
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
        />

        {/* Laser Bevel Top */}
        <div
          className={`absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent ${style.accent} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
        />

        {/* Kinetic Light Beam */}
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 w-1/2 bg-linear-to-r from-transparent ${style.beam} to-transparent skew-x-[-20deg] pointer-events-none`}
        />

        {/* Icon Revolution */}
        <div
          className={`w-11 h-11 rounded-2xl ${style.iconBg} flex items-center justify-center ${style.icon} ${style.iconHover} group-hover:text-white transition-all mb-5 group-hover:rotate-360 duration-700 relative z-20`}
        >
          <Icon size={22} />
        </div>

        {/* Label & Ping */}
        <div className="flex items-center gap-3 relative z-20">
          <h4
            className={`text-white font-black text-xs tracking-[0.2em] uppercase transition-colors ${style.text}`}
          >
            {title}
          </h4>
          <div className="h-px grow bg-white/10 group-hover:bg-white/20 transition-colors" />
          <div
            className={`w-1.5 h-1.5 rounded-full ${style.ping} group-hover:animate-ping`}
          />
        </div>
      </motion.div>
    </div>
  );
};

const SmartAudit = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (user?.email) {
      navigate("/my-bills");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="py-8 md:py-16 bg-[#060A14] overflow-hidden relative text-white border-y border-white/5 font-outfit">
      {/* --- KINETIC ATMOSPHERE (MULTI-LAYER) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [-20, 20, -20], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.08)_0%,transparent_70%)]"
        />
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(#fff 0.5px, transparent 0.5px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* --- LEFT: THE NEURAL WEAVER --- */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
              visible: {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 1, ease: "easeOut" },
              },
            }}
            className="lg:col-span-12 xl:col-span-5 relative flex justify-center perspective-[2000px]"
          >
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              {/* 1. THE AUDIT ENGINE (NESTED RINGS) */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Rotating Glass Rings */}
                {[
                  {
                    size: "w-full h-full",
                    dur: 20,
                    rev: false,
                    border: "border-white/5",
                  },
                  {
                    size: "w-[85%] h-[85%]",
                    dur: 15,
                    rev: true,
                    border: "border-emerald-500/10",
                  },
                  {
                    size: "w-[70%] h-[70%]",
                    dur: 25,
                    rev: false,
                    border: "border-blue-500/10",
                  },
                ].map((r, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: r.rev ? -360 : 360 }}
                    transition={{
                      duration: r.dur,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`absolute ${r.size} rounded-full border-2 ${r.border} border-dashed`}
                  />
                ))}
                {/* The Protected Core */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 30px rgba(16,185,129,0.1)",
                      "0 0 60px rgba(16,185,129,0.3)",
                      "0 0 30px rgba(16,185,129,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-slate-950/40 border-2 border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(16,185,129,0.2)] flex items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)] animate-pulse" />
                  <FiShield
                    className="text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                    size={48}
                    strokeWidth={1}
                  />
                  <div className="absolute inset-2 border border-white/20 rounded-2xl animate-ping opacity-20" />
                </motion.div>
              </div>

              {/* 2. THE ENERGY FILAMENTS */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10"
                viewBox="0 0 400 400"
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {["amber", "blue", "emerald", "indigo"].map((c) => (
                    <linearGradient
                      key={c}
                      id={`grad-${c}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="transparent" />
                      <stop
                        offset="50%"
                        stopColor={
                          c === "amber"
                            ? "#f59e0b"
                            : c === "blue"
                            ? "#3b82f6"
                            : c === "emerald"
                            ? "#10b981"
                            : "#6366f1"
                        }
                      />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  ))}
                </defs>
                <path
                  d="M 50 50 Q 200 100 200 200"
                  stroke="url(#grad-amber)"
                  strokeWidth="1.5"
                  fill="none"
                  filter="url(#glow)"
                >
                  <motion.animate
                    attributeName="stroke-dasharray"
                    values="0, 400; 400, 0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M 350 50 Q 200 100 200 200"
                  stroke="url(#grad-blue)"
                  strokeWidth="1.5"
                  fill="none"
                  filter="url(#glow)"
                >
                  <motion.animate
                    attributeName="stroke-dasharray"
                    values="400, 0; 0, 400"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M 50 350 Q 200 300 200 200"
                  stroke="url(#grad-emerald)"
                  strokeWidth="1.5"
                  fill="none"
                  filter="url(#glow)"
                >
                  <motion.animate
                    attributeName="stroke-dasharray"
                    values="0, 400; 400, 0"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M 350 350 Q 200 300 200 200"
                  stroke="url(#grad-indigo)"
                  strokeWidth="1.5"
                  fill="none"
                  filter="url(#glow)"
                >
                  <motion.animate
                    attributeName="stroke-dasharray"
                    values="400, 0; 0, 400"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>

              {/* 3. THE UTILITY PODS */}
              {[
                {
                  id: "p1",
                  Icon: FiZap,
                  label: "ELECTRICITY",
                  color: "amber",
                  pos: "top-[-5%] left-[-5%]",
                },
                {
                  id: "p2",
                  Icon: FaGripfire,
                  label: "GAS",
                  color: "blue",
                  pos: "top-[-5%] right-[-5%]",
                },
                {
                  id: "p3",
                  Icon: FiDroplet,
                  label: "WATER",
                  color: "emerald",
                  pos: "bottom-[-5%] left-[-5%]",
                },
                {
                  id: "p4",
                  Icon: FiWifi,
                  label: "INTERNET",
                  color: "indigo",
                  pos: "bottom-[-5%] right-[-5%]",
                },
              ].map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotateZ: i % 2 === 0 ? 5 : -5 }}
                  className={`absolute ${p.pos} w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl flex flex-col items-center justify-center p-4 z-20 group transition-all hover:border-${p.color}-500/50`}
                >
                  <div
                    className={`absolute inset-0 bg-${p.color}-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div
                    className={`text-${p.color}-400 mb-1.5 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-transform group-hover:scale-110`}
                  >
                    <p.Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-black text-white tracking-widest leading-tight group-hover:text-emerald-400 transition-colors uppercase">
                      {p.label}
                    </p>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {[1, 2, 3].map((d) => {
                      const dotColors = {
                        amber: "bg-amber-500/50",
                        blue: "bg-blue-500/50",
                        emerald: "bg-emerald-500/50",
                        indigo: "bg-indigo-500/50",
                      };
                      return (
                        <div
                          key={d}
                          className={`w-0.5 h-0.5 rounded-full ${
                            dotColors[p.color]
                          }`}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* --- RIGHT: THE EXECUTIVE PITCH --- */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center text-center xl:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex m-auto xl:m-0 w-fit items-center gap-2.5 px-4 py-1.5 bg-emerald-500/5 rounded-full text-emerald-400 font-bold text-xs uppercase tracking-[0.4em] mb-8 border border-emerald-500/10"
            >
              <FiLayers size={16} className="animate-pulse" />
              Unified Bill Management
            </motion.div>

            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight mt-3">
              Total Visibility. <br />
              <span className="text-emerald-500">One</span> Dashboard.
            </h2>

            <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed font-medium max-w-2xl mx-auto xl:mx-0">
              Monitor your electricity, water, and gas usage while ensuring your
              payments are always organized and on time.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-10 max-w-2xl mx-auto xl:mx-0 text-left">
              <UltraPremiumCard
                Icon={FiActivity}
                title="Usage History"
                color="emerald"
                action="Instant View"
              />
              <UltraPremiumCard
                Icon={FiShield}
                title="Secure Portal"
                color="blue"
                action="Bank Grade"
              />
            </div>

            <button
              onClick={handleDashboardClick}
              className="relative group w-full xl:w-fit px-10 py-4 overflow-hidden rounded-xl font-black text-white transition-all active:scale-95 shadow-xl border border-emerald-500/20 m-auto xl:m-0"
            >
              <div className="absolute inset-0 bg-emerald-600 group-hover:bg-emerald-700 transition-colors" />
              <span className="relative z-10 flex items-center justify-center gap-3 text-sm uppercase tracking-wider leading-none">
                <LuLayoutDashboard size={23} />
                Go to Dashboard
                <FiArrowRight size={20} />
              </span>
              <motion.div
                animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-size-[250%_250%] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
              />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SmartAudit;
