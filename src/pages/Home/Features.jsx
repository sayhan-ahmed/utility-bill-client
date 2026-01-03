import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, CreditCard, Bell } from "lucide-react";

const ProcessStep = ({
  number,
  icon: Icon,
  title,
  description,
  delay,
  isLast,
}) => {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay }}
        className="relative z-10"
      >
        {/* Step number badge */}
        <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">
          {number}
        </div>

        {/* Icon container */}
        <div className="h-20 w-20 rounded-2xl bg-white border-2 border-emerald-100 flex items-center justify-center text-emerald-600 shadow-lg hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group">
          <Icon
            size={36}
            strokeWidth={1.5}
            className="group-hover:scale-110 transition-transform"
          />
        </div>
      </motion.div>

      {/* Connecting line */}
      {!isLast && (
        <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-linear-to-r from-emerald-200 via-emerald-300 to-emerald-200 z-0" />
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
        className="mt-6 text-center"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
          {description}
        </p>
      </motion.div>
    </div>
  );
};

const Features = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Account",
      description:
        "Sign up in seconds to start managing your utilities efficiently.",
    },
    {
      icon: Search,
      title: "Find Your Bills",
      description:
        "Search and track your electricity, water, gas, and internet bills.",
    },
    {
      icon: CreditCard,
      title: "Pay Securely",
      description:
        "Make payments instantly through our secure and trusted platform.",
    },
    {
      icon: Bell,
      title: "Get Reminders",
      description:
        "Never miss a due date again with our automated notification system.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white font-outfit relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-slate-50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">
              Process
            </span>
            <span className="h-px w-8 bg-emerald-500" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            How it <span className="text-emerald-600">Works</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg"
          >
            Manage your utility expenses with zero stress. Follow these simple
            steps to take full control of your billing life.
          </motion.p>
        </motion.div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              number={index + 1}
              {...step}
              delay={index * 0.15}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
