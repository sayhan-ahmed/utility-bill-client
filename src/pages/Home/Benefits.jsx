import React from "react";
import { motion } from "framer-motion";
import { Layers, Shield, Bell, BarChart3, Zap, Globe } from "lucide-react";

const BenefitCard = ({ Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      className="group relative bg-white border border-slate-100 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200 h-full"
    >
      {/* Icon Container */}
      <div className="mb-6">
        <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-emerald-500/20">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>

      {/* Subtle accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-emerald-500 to-emerald-400 group-hover:w-full transition-all duration-500 rounded-b-3xl" />
    </motion.div>
  );
};

const Benefits = () => {
  const benefits = [
    {
      Icon: Layers,
      title: "Centralized Management",
      description:
        "Manage all your utility bills from a single, unified dashboard. No more juggling multiple apps or websites.",
    },
    {
      Icon: Shield,
      title: "Secure Payments",
      description:
        "Bank-level encryption and secure payment gateways ensure your financial data is always protected.",
    },
    {
      Icon: Bell,
      title: "Smart Reminders",
      description:
        "Never miss a due date with automated notifications and customizable payment reminders.",
    },
    {
      Icon: BarChart3,
      title: "Payment History",
      description:
        "Access complete transaction records and detailed billing history anytime you need it.",
    },
    {
      Icon: Zap,
      title: "Multiple Utilities",
      description:
        "Track and pay for electricity, gas, water, and internet bills all in one convenient place.",
    },
    {
      Icon: Globe,
      title: "24/7 Access",
      description:
        "Manage your bills anytime, anywhere with our responsive web platform and mobile support.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 font-outfit relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Layers size={16} />
            Why Choose Us
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            Built for Your <span className="text-emerald-600">Convenience</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            Experience seamless utility management with features designed to
            simplify your life and save you time.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
