import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { X, Check, ArrowRight, Sparkles } from "lucide-react";

// Premium comparison row with 3D effects
const ComparisonRow = ({ old, new: newText, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(event) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (event.clientX - centerX) / (rect.width / 2);
    const y = (event.clientY - centerY) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="relative group mb-4 last:mb-0"
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Magnetic glow effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-1.5 bg-linear-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 rounded-2xl blur-lg"
        />

        {/* Main comparison card */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-xl border border-slate-200/60 shadow-lg shadow-slate-900/5 overflow-hidden">
          {/* Shimmer overlay */}
          <motion.div
            animate={{
              x: isHovered ? ["0%", "200%"] : "0%",
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          />

          <div className="grid md:grid-cols-2 gap-0 p-5 md:p-6">
            {/* OLD - Left side */}
            <div className="relative flex items-start gap-3 md:pr-6 pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-slate-200/50">
              <motion.div
                animate={{
                  scale: isHovered ? 0.95 : 1,
                  rotate: isHovered ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="mt-0.5 shrink-0"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/15 rounded-full blur-sm" />
                  <div className="relative w-8 h-8 rounded-full bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md shadow-red-500/20">
                    <X size={16} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>

              <div className="flex-1 pt-0.5">
                <div className="text-[9px] font-bold text-red-500/70 uppercase tracking-wider mb-1">
                  Old Way
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {old}
                </p>
              </div>
            </div>

            {/* Arrow transition (mobile) */}
            <div className="md:hidden flex justify-center py-3">
              <motion.div
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-7 h-7 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm"
              >
                <ArrowRight
                  size={14}
                  className="text-white"
                  strokeWidth={2.5}
                />
              </motion.div>
            </div>

            {/* NEW - Right side */}
            <div className="relative flex items-start gap-3 md:pl-6 pt-5 md:pt-0">
              <motion.div
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  rotate: isHovered ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="mt-0.5 shrink-0"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-emerald-500/25 rounded-full blur-sm"
                  />
                  <div className="relative w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/25">
                    <Check size={16} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>

              <div className="flex-1 pt-0.5">
                <div className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  New Way
                  <Sparkles size={9} className="text-emerald-500" />
                </div>
                <p className="text-sm text-slate-800 font-semibold leading-relaxed">
                  {newText}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            animate={{
              scaleX: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="h-0.5 bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-500 origin-left"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Comparison = () => {
  const comparisons = [
    {
      old: "Multiple websites to visit for different utilities",
      new: "One unified dashboard for all your bills",
    },
    {
      old: "Paper bills scattered everywhere, hard to track",
      new: "All bills digitally organized in one place",
    },
    {
      old: "Different payment methods for each service",
      new: "Single secure payment hub for everything",
    },
    {
      old: "Easy to miss due dates and pay late fees",
      new: "Automated smart reminders keep you on track",
    },
  ];

  return (
    <section className="relative py-12 md:py-16 bg-linear-to-b from-slate-50 via-white to-slate-50 font-outfit overflow-hidden">
      {/* Premium background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-linear-to-br from-emerald-400/20 via-teal-400/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-linear-to-tr from-teal-400/20 via-emerald-400/10 to-transparent rounded-full blur-3xl"
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Premium header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full border border-emerald-200/50 shadow-md shadow-emerald-500/5 mb-5"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles size={14} className="text-emerald-600" />
            </motion.div>
            <span className="text-emerald-700 text-[11px] font-black uppercase tracking-[0.15em]">
              The Transformation
            </span>
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          </motion.div>

          {/* Main heading */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Before vs{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                After
              </span>
              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-1 left-0 right-0 h-1 bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-600 rounded-full origin-left"
              />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-base md:text-lg font-medium max-w-xl mx-auto">
            See how we've revolutionized utility bill management
          </p>
        </motion.div>

        {/* Comparison rows container */}
        <div className="max-w-4xl mx-auto">
          {comparisons.map((item, index) => (
            <ComparisonRow key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comparison;
