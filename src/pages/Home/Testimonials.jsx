import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Homeowner",
    content:
      "BillEase has completely changed how I manage my utilities. No more late fees and the dashboard is incredibly intuitive!",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    content:
      "The best utility tracking platform I've used. Sorting through 20+ business bills a month used to take hours, now it's minutes.",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 5,
  },
  {
    name: "Emma Wilson",
    role: "Freelancer",
    content:
      "I love the automated reminders! It gives me peace of mind knowing all my internet and electricity bills are paid on time.",
    avatar: "https://i.pravatar.cc/150?u=emma",
    rating: 5,
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: -15,
    filter: "blur(10px)",
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  }),
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="h-px w-8 bg-[#009E67]" />
            <span className="text-[#009E67] font-bold uppercase tracking-widest text-sm">
              Feedback
            </span>
            <span className="h-px w-8 bg-[#009E67]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            What Our <span className="text-[#009E67]">Users</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg"
          >
            Don't just take our word for it. Thousands of users trust BillEase
            to handle their daily utility management perfectly.
          </motion.p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ perspective: "1500px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -12,
                scale: 1.02,
                rotateY: index === 0 ? 5 : index === 2 ? -5 : 0,
              }}
              className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative group transition-all duration-500 hover:shadow-2xl hover:shadow-[#009E67]/10"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 p-3 bg-[#009E67] rounded-2xl text-white shadow-lg shadow-green-200 rotate-0 group-hover:rotate-12 transition-transform duration-500">
                <Quote size={24} />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full border-2 border-[#009E67]/20 object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-400 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
