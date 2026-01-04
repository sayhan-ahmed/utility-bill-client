import React from "react";
import { motion } from "framer-motion";
import { FileText, Scale } from "lucide-react";

const TermsConditions = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using BillEase, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.",
    },
    {
      title: "2. Use of Service",
      content:
        "You agree to use BillEase only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account and password.",
    },
    {
      title: "3. User Accounts",
      content:
        "When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.",
    },
    {
      title: "4. Payment Processing",
      content:
        "All payments processed through BillEase are subject to verification and approval. We reserve the right to refuse or cancel any transaction for any reason.",
    },
    {
      title: "5. Intellectual Property",
      content:
        "The Service and its original content, features, and functionality are and will remain the exclusive property of BillEase and its licensors.",
    },
    {
      title: "6. Limitation of Liability",
      content:
        "In no event shall BillEase, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.",
    },
    {
      title: "7. Changes to Terms",
      content:
        "We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.",
    },
    {
      title: "8. Contact Information",
      content:
        "If you have any questions about these Terms, please contact us at support@billease.app.",
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
            <Scale size={16} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Legal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Terms & <span className="text-green-600">Conditions</span>
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

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 md:p-12 border border-slate-100 shadow-sm"
        >
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-8 text-lg">
              Please read these Terms and Conditions carefully before using the
              BillEase service. Your access to and use of the Service is
              conditioned on your acceptance of and compliance with these Terms.
            </p>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    {section.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-sm text-slate-700">
                <strong>Note:</strong> By using BillEase, you acknowledge that
                you have read, understood, and agree to be bound by these Terms
                and Conditions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsConditions;
