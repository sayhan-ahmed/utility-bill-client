import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  Shield,
  Zap,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To simplify utility bill management for everyone by providing a secure, unified platform that saves time and reduces stress.",
    },
    {
      icon: Users,
      title: "Who We Serve",
      description:
        "Homeowners, businesses, and anyone who wants to manage their utility bills efficiently in one convenient location.",
    },
    {
      icon: Shield,
      title: "Security First",
      description:
        "We use bank-level encryption and industry-standard security practices to protect your sensitive financial information.",
    },
  ];

  const stats = [
    { number: "2M+", label: "Active Users" },
    { number: "10M+", label: "Bills Processed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
            <Zap size={16} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              About BillEase
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Simplifying <span className="text-green-600">Bill Management</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            BillEase is your trusted partner for managing all your utility bills
            in one place. We're committed to making bill payments simple,
            secure, and stress-free.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-slate-600">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-green-50 rounded-xl w-fit mb-4">
                  <Icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-linear-to-br from-green-600 to-emerald-600 rounded-3xl p-12 text-white"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
              Why Choose BillEase?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "One unified dashboard for all utilities",
                "Secure payment processing",
                "Automated payment reminders",
                "Complete transaction history",
                "24/7 customer support",
                "Mobile-friendly platform",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
