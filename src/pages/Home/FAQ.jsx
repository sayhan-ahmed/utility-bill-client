import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I pay my utility bills through BillEase?",
    answer:
      "Paying is simple! Just log in, find your bill in the 'All Bills' section or click 'Pay' on a recent bill on your dashboard. Follow the prompts to enter your payment details and confirm.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use industry-standard encryption and secure payment gateways to ensure your financial data is always protected.",
  },
  {
    question: "Can I track my payment history?",
    answer:
      "Yes, you can. The 'Payments' section in your dashboard keeps a complete record of all your past transactions, which you can filter by date and utility type.",
  },
  {
    question: "What should I do if a bill is incorrect?",
    answer:
      "If you notice a discrepancy, please contact our 24/7 support team immediately. We'll help you verify the bill details and resolve any issues with the utility provider.",
  },
  {
    question: "Are there any service fees for using BillEase?",
    answer:
      "BillEase offers a basic tier for free. Some premium features or specific payment methods might have a small transaction fee, which will always be clearly shown before you pay.",
  },
];

const FAQ = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">
              Answers
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
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg"
          >
            Everything you need to know about managing your bills with BillEase.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
                activeIdx === idx
                  ? "border-emerald-500 shadow-xl shadow-emerald-500/5 bg-emerald-50/20"
                  : "border-slate-100 bg-white hover:border-emerald-200"
              }`}
            >
              <button
                onClick={() => setActiveIdx(activeIdx === idx ? -1 : idx)}
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-xl transition-colors duration-300 ${
                      activeIdx === idx
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <HelpCircle size={20} />
                  </div>
                  <span
                    className={`text-lg font-bold transition-colors duration-300 ${
                      activeIdx === idx
                        ? "text-slate-900"
                        : "text-slate-700 hover:text-emerald-600"
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform duration-500 ${
                    activeIdx === idx ? "rotate-180 text-emerald-500" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-0 ml-12">
                      <p className="text-slate-500 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
