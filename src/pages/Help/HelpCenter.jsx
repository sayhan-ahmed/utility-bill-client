import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  Mail,
  Phone,
  Book,
} from "lucide-react";

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "general", label: "General", icon: HelpCircle },
    { id: "payments", label: "Payments", icon: MessageCircle },
    { id: "account", label: "Account", icon: Book },
  ];

  const faqs = {
    general: [
      {
        question: "What is BillEase?",
        answer:
          "BillEase is a comprehensive utility bill management platform that allows you to view, track, and pay all your utility bills in one convenient location.",
      },
      {
        question: "How do I get started?",
        answer:
          "Simply create a free account, add your utility bills, and start managing your payments all in one place. It only takes a few minutes to set up.",
      },
      {
        question: "Is BillEase free to use?",
        answer:
          "Yes, BillEase offers a free basic tier. Some premium features may require a subscription, but all core functionality is available at no cost.",
      },
    ],
    payments: [
      {
        question: "How do I pay my bills?",
        answer:
          "Navigate to your bills dashboard, select the bill you want to pay, and follow the payment prompts. We support multiple payment methods including credit cards and bank transfers.",
      },
      {
        question: "Are my payments secure?",
        answer:
          "Absolutely. We use bank-level encryption and industry-standard security protocols to ensure all your payment information is protected.",
      },
      {
        question: "Can I schedule automatic payments?",
        answer:
          "Yes, you can set up automatic payments for recurring bills to ensure you never miss a due date.",
      },
    ],
    account: [
      {
        question: "How do I update my account information?",
        answer:
          "Go to your profile settings where you can update your personal information, email, password, and notification preferences.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password via email.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Contact our support team at support@billease.app to request account deletion. We'll process your request within 48 hours.",
      },
    ],
  };

  const filteredFaqs = faqs[activeCategory].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/20 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
            <HelpCircle size={16} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Support
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Help <span className="text-green-600">Center</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support
            team.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeCategory === category.id
                    ? "bg-green-600 text-white shadow-lg shadow-green-100"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-green-300"
                }`}
              >
                <Icon size={18} />
                {category.label}
              </button>
            );
          })}
        </motion.div>

        {/* FAQs */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`bg-white rounded-xl border transition-all ${
                  expandedFaq === index
                    ? "border-green-500 shadow-lg shadow-green-100"
                    : "border-slate-200"
                }`}
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${
                      expandedFaq === index ? "rotate-180 text-green-600" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-br from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-4">Still Need Help?</h2>
            <p className="text-lg opacity-90">
              Our support team is here to assist you 24/7
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="/contact"
              className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
            >
              <Mail className="w-8 h-8" />
              <span className="font-bold">Email Us</span>
              <span className="text-sm opacity-90">support@billease.app</span>
            </a>
            <a
              href="tel:+8801234567890"
              className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
            >
              <Phone className="w-8 h-8" />
              <span className="font-bold">Call Us</span>
              <span className="text-sm opacity-90">+880 123 456 7890</span>
            </a>
            <a
              href="/contact"
              className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
            >
              <MessageCircle className="w-8 h-8" />
              <span className="font-bold">Live Chat</span>
              <span className="text-sm opacity-90">Available 24/7</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HelpCenter;
