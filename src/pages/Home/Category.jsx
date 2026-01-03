import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Zap, Droplet, Wifi, Flame, LayoutGrid } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 40 },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * PrismNode: Unique Light-Glass card with refraction shimmer.
 */
const PrismNode = ({ id, Icon, title, description }) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  function handleMouseMove(event) {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  }

  const shimmerX = useTransform(mouseX, [0, 1], ["-20%", "20%"]);
  const shimmerY = useTransform(mouseY, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      className="group relative bg-white/80 border border-emerald-100 hover:border-emerald-400/50 rounded-2xl p-7 transition-all duration-500 overflow-hidden backdrop-blur-2xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/5 h-full"
    >
      {/* Radiant Prism Shimmer (Refraction) */}
      <motion.div
        style={{
          left: shimmerX,
          top: shimmerY,
        }}
        className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-teal-500/5 to-transparent pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Radiant Core */}
      <div className="relative mb-6">
        <div className="relative h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 z-10 transition-transform duration-500 group-hover:scale-110">
          <Icon size={24} strokeWidth={2} />
        </div>
        {/* Soft Aura Glow */}
        <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
      </div>

      {/* Text Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Category = () => {
  const categories = [
    {
      id: 1,
      Icon: Zap,
      title: "Electricity",
      description:
        "Manage your power usage and track billing history securely.",
    },
    {
      id: 2,
      Icon: Flame,
      title: "Gas Supply",
      description: "Monitor gas consumption and audit your monthly statements.",
    },
    {
      id: 3,
      Icon: Droplet,
      title: "Water Utility",
      description: "Track volumes and flow records for your water services.",
    },
    {
      id: 4,
      Icon: Wifi,
      title: "Internet",
      description: "Manage your digital connectivity and network bill records.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white font-outfit relative overflow-hidden">
      {/* Fluid Mesh Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Mesh Gradients */}
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(0,158,103,0.03)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] blur-[100px]" />
        {/* Subtle Fluid Dots */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #10b981 0.5px, transparent 0.5px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Radiant Left Messaging */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="lg:col-span-12 xl:col-span-5"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
            >
              <LayoutGrid size={16} className="text-emerald-500" />
              Categories
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-8"
            >
              Every Bill. <br />
              <span className="text-emerald-600">Total Clarity.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg"
            >
              Navigate through your core utility categories with ease. We
              provide a world-class interface for managing and tracking your
              billing lifecycle.
            </motion.p>
          </motion.div>

          {/* Prism Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="lg:col-span-12 xl:col-span-7"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {categories.map((cat) => (
                <PrismNode key={cat.id} {...cat} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Category;
