import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, CreditCard, Bell } from "lucide-react";

const Features = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Account",
      description:
        "Sign up in seconds to start managing your utilities efficiently.",
      color: "bg-blue-500",
      text: "text-blue-500",
      border: "group-hover:border-blue-500/60",
    },
    {
      icon: Search,
      title: "Find Your Bills",
      description:
        "Search and track your electricity, water, gas, and internet bills.",
      color: "bg-emerald-500",
      text: "text-emerald-500",
      border: "group-hover:border-emerald-500/60",
    },
    {
      icon: CreditCard,
      title: "Pay Securely",
      description:
        "Make payments instantly through our secure and trusted platform.",
      color: "bg-purple-500",
      text: "text-purple-500",
      border: "group-hover:border-purple-500/60",
    },
    {
      icon: Bell,
      title: "Get Reminders",
      description:
        "Never miss a due date again with our automated notification system.",
      color: "bg-amber-500",
      text: "text-amber-500",
      border: "group-hover:border-amber-500/60",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">
              Process
            </span>
            <span className="h-px w-8 bg-emerald-500" />
          </motion.div>
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
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group h-full"
            >
              <div
                className={`bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] h-full transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-slate-200/60 ${step.border} flex flex-col`}
              >
                <div
                  className={`h-16 w-16 ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg rotate-0 group-hover:rotate-5 group-hover:scale-105 transition-transform duration-500`}
                >
                  <step.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed grow">
                  {step.description}
                </p>
                <div
                  className={`mt-6 flex items-center gap-2 ${step.text} font-black text-5xl opacity-20 group-hover:opacity-100 transition-all duration-500`}
                >
                  0{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
