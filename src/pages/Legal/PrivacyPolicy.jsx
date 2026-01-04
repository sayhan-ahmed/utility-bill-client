import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, including your name, email address, phone number, billing information, and utility account details. We also automatically collect certain information about your device and how you interact with our service.",
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services, process your transactions, send you technical notices and support messages, respond to your comments and questions, and protect against fraudulent or illegal activity.",
    },
    {
      icon: UserCheck,
      title: "Information Sharing",
      content:
        "We do not sell your personal information. We may share your information with service providers who perform services on our behalf, with utility companies to process your payments, and when required by law or to protect our rights.",
    },
    {
      icon: Lock,
      title: "Data Security",
      content:
        "We use industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.",
    },
    {
      icon: Shield,
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal information at any time. You can also opt-out of marketing communications and request a copy of the data we hold about you.",
    },
  ];

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/20 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
            <Shield size={16} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Privacy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Privacy <span className="text-green-600">Policy</span>
          </h1>
          <p className="text-slate-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm mb-8"
        >
          <p className="text-slate-600 text-lg leading-relaxed">
            At BillEase, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our service. Please read this privacy
            policy carefully.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 rounded-xl shrink-0">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-linear-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
          <p className="mb-6 opacity-90">
            If you have any questions or concerns about our Privacy Policy,
            please don't hesitate to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
