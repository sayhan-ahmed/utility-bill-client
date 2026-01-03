import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  CreditCard,
  Zap,
  Wifi,
  Droplet,
  TrendingUp,
  Users,
} from "lucide-react";

const slides = [
  {
    img: "https://i.postimg.cc/3NSDrnq7/pexels-photo-6328856.jpg",
    badge: "SMART BILL MANAGEMENT",
    title: "UTILITY",
    subtitle: "PAYMENTS",
    description: "Pay all your bills in one secure dashboard",
    longDesc:
      "Experience seamless bill management with real-time tracking, automated reminders, and instant payment processing.",
    stat: "$0",
    statLabel: "Service Fee",
    cta1: "Get Started",
    cta2: "Watch Demo",
    billTypes: [
      { icon: Zap, name: "Electricity", color: "text-yellow-600 bg-yellow-50" },
      { icon: Wifi, name: "Internet", color: "text-blue-600 bg-blue-50" },
      { icon: Droplet, name: "Water", color: "text-cyan-600 bg-cyan-50" },
    ],
  },
  {
    img: "https://images.pexels.com/photos/7657728/pexels-photo-7657728.jpeg",
    badge: "STAY ORGANIZED",
    title: "BILL",
    subtitle: "TRACKING",
    description: "Never miss a payment deadline again",
    longDesc:
      "Smart notifications, payment history, and advanced analytics to keep you in complete control of your finances.",
    stat: "100%",
    statLabel: "On-Time Rate",
    cta1: "View Dashboard",
    cta2: "Watch Demo",
    billTypes: [
      { icon: Zap, name: "Electricity", color: "text-yellow-600 bg-yellow-50" },
      { icon: Wifi, name: "Internet", color: "text-blue-600 bg-blue-50" },
      { icon: Droplet, name: "Water", color: "text-cyan-600 bg-cyan-50" },
    ],
  },
  {
    img: "https://i.postimg.cc/WzHhctDR/pexels-photo-920382.jpg",
    badge: "SECURE PLATFORM",
    title: "SAFE &",
    subtitle: "ENCRYPTED",
    description: "Bank-level security for your data",
    longDesc:
      "Military-grade encryption, two-factor authentication, and compliance with international security standards.",
    stat: "256",
    statLabel: "Bit Encryption",
    cta1: "Learn More",
    cta2: "Watch Demo",
    billTypes: [
      { icon: Zap, name: "Electricity", color: "text-yellow-600 bg-yellow-50" },
      { icon: Wifi, name: "Internet", color: "text-blue-600 bg-blue-50" },
      { icon: Droplet, name: "Water", color: "text-cyan-600 bg-cyan-50" },
    ],
  },
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollIndicator(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    document
      .querySelector("#statistics")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-linear-to-br from-slate-50 via-white to-emerald-50/20 pt-6 pb-16 md:pt-8 lg:pt-10">
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#009E67 1px, transparent 1px), linear-gradient(90deg, #009E67 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        slidesPerView={1}
        loop
        speed={600}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        pagination={{ el: ".hero-pagination", clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full relative z-10"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* LEFT - Image & Cards */}
                  <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
                    {/* Main Image */}
                    <div className="relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={
                          isActive
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.9 }
                        }
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative bg-white rounded-3xl overflow-hidden"
                      >
                        <motion.img
                          src={slide.img}
                          alt=""
                          initial={{ scale: 1 }}
                          animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                          transition={{
                            duration: 10,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          className="w-full h-auto object-cover min-h-[250px]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                      </motion.div>
                    </div>

                    {/* Bill Type Cards */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="grid grid-cols-3 gap-3"
                    >
                      {slide.billTypes.map((bill, idx) => {
                        const Icon = bill.icon;
                        return (
                          <motion.div
                            key={idx}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="bg-white rounded-xl p-4 shadow-lg border border-slate-200/50 transition-all cursor-pointer group min-h-[100px] flex flex-col"
                          >
                            <div
                              className={`w-10 h-10 rounded-lg ${bill.color} flex items-center justify-center mb-2 group-hover:bg-[#009E67] group-hover:text-white transition-colors`}
                            >
                              <Icon size={20} />
                            </div>
                            <p className="text-xs font-bold text-slate-700">
                              {bill.name}
                            </p>
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* Active Bills Card */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="bg-linear-to-br from-[#009E67] to-emerald-600 rounded-2xl p-5 text-white shadow-xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-semibold opacity-90 mb-1">
                            Active Bills
                          </p>
                          <p className="text-3xl font-black">12</p>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <TrendingUp size={20} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                          <span className="font-bold">3 Due Soon</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* RIGHT - Content */}
                  <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full"
                    >
                      <div className="w-2 h-2 bg-[#009E67] rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-[#009E67] uppercase tracking-wider">
                        {slide.badge}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <div className="overflow-hidden">
                      <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={
                          isActive
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 50 }
                        }
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-none mb-2"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        animate={
                          isActive
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 50 }
                        }
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-linear-to-r from-[#009E67] to-emerald-500 bg-clip-text text-transparent leading-none"
                      >
                        {slide.subtitle}
                      </motion.h2>
                    </div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="space-y-3"
                    >
                      <p className="text-lg md:text-xl font-bold text-slate-700">
                        {slide.description}
                      </p>
                      <p className="text-sm md:text-base text-slate-600 max-w-xl">
                        {slide.longDesc}
                      </p>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={
                        isActive
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.9 }
                      }
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200/50 min-h-[120px] flex flex-col justify-between hover:border-[#009E67] transition-colors">
                        <TrendingUp size={24} className="text-[#009E67] mb-2" />
                        <div>
                          <p className="text-3xl font-black text-slate-900">
                            {slide.stat}
                          </p>
                          <p className="text-sm font-semibold text-slate-600">
                            {slide.statLabel}
                          </p>
                        </div>
                      </div>
                      <div className="bg-linear-to-br from-[#009E67] to-emerald-600 rounded-xl p-5 shadow-lg text-white min-h-[120px] flex flex-col justify-between">
                        <Users size={24} className="mb-2" />
                        <div>
                          <p className="text-3xl font-black">2M+</p>
                          <p className="text-sm font-semibold opacity-90">
                            Verified Users
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="flex flex-wrap gap-4"
                    >
                      <a
                        href="/bills"
                        className="px-6 py-3 md:px-8 md:py-4 bg-linear-to-r from-[#009E67] to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-200 hover:scale-105 transition-all flex items-center gap-2 text-sm md:text-base group"
                      >
                        View Dashboard
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </a>
                      <a
                        href="/bills"
                        className="px-6 py-3 md:px-8 md:py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:border-[#009E67] hover:text-[#009E67] hover:scale-105 transition-all text-sm md:text-base shadow-sm"
                      >
                        Manage Bills
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation - Hidden on mobile */}
      <button className="hero-prev hidden md:flex absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-slate-700 hover:bg-[#009E67] hover:text-white transition-all">
        <ChevronLeft size={24} />
      </button>
      <button className="hero-next hidden md:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-slate-700 hover:bg-[#009E67] hover:text-white transition-all">
        <ChevronRight size={24} />
      </button>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hero-pagination flex items-center gap-3" />
          <div className="text-slate-500 text-sm font-bold whitespace-nowrap">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={scrollToNext}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-slate-400 hover:text-[#009E67] transition-colors"
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        .hero-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #009E67;
        }
      `}</style>
    </section>
  );
}
