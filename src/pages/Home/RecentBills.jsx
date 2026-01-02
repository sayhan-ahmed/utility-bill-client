import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Calendar,
  MapPin,
  Tag,
  ArrowRight,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";
import { LuNewspaper } from "react-icons/lu";
import AuthContext from "../../provider/AuthContext";

export default function RecentBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("https://utility-bill-server-eight.vercel.app/bills")
      .then((res) => res.json())
      .then((data) => {
        if (!alive) return;
        const fetchedBills = Array.isArray(data) ? data : [];
        // Sort by date (newest first) and take top 8
        const sortedBills = fetchedBills.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setBills(sortedBills.slice(0, 8));
      })
      .catch((e) => console.error("Recent bills error:", e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  //   Loading Skeleton
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-extrabold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
          Recent Bills
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group rounded-2xl bg-white shadow-md overflow-hidden animate-pulse border border-slate-100"
            >
              <div className="h-40 w-full bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-6 w-3/4 bg-slate-200 rounded mb-2" />
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-2/3 bg-slate-100 rounded" />
                <div className="pt-4 flex justify-between">
                  <div className="h-4 w-16 bg-slate-200 rounded" />
                  <div className="h-8 w-24 bg-slate-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div className="relative">
          {/* dots */}
          <div className="absolute -left-6 -top-6 h-24 w-24 opacity-20 hidden sm:block">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(i % 10) * 10}
                  cy={Math.floor(i / 10) * 10}
                  r="1.5"
                  fill="#6b7280"
                />
              ))}
            </svg>
          </div>
          <p className="section-title">
            <LuNewspaper />
            Recent Bills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Recent <span className="text-[#009E67]">Transactions</span>
          </h2>
          <p className="text-slate-500 mt-2 max-w-lg">
            Track your payment history and manage your utility expenses
            efficiently.
          </p>
        </div>
        <Link to={"/bills"}>
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-[#009E67] hover:text-[#009E67] transition-all flex items-center gap-2">
            Explore All Bills
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {bills.slice(0, 8).map((bill, idx) => (
          <div
            key={bill._id || bill.id || idx}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
          >
            <BillCard bill={bill} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
}

// Card Design
function BillCard({ bill, index }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleSeeDetails = () => {
    navigate(`/bills/${bill._id}`);
  };

  // Generate placeholder image based on category if needed
  const getPlaceholderImage = (category) => {
    const type = category?.toLowerCase() || "";
    if (type.includes("electric"))
      return "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400";
    if (type.includes("water"))
      return "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=400";
    if (type.includes("internet") || type.includes("wifi"))
      return "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?auto=format&fit=crop&q=80&w=400";
    return "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400";
  };

  const imageSrc = bill.image || getPlaceholderImage(bill.category);
  const price = bill.amount ? `৳${bill.amount}` : "৳124.50"; // Mock price if missing
  const status = bill.status || "Pending";
  const date = bill.date
    ? new Date(bill.date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "Oct 24, 2025";

  const shortenMonthNames = (text) => {
    if (!text) return "";
    const monthMap = {
      January: "Jan",
      February: "Feb",
      March: "Mar",
      April: "Apr",
      May: "May",
      June: "Jun",
      July: "Jul",
      August: "Aug",
      September: "Sep",
      October: "Oct",
      November: "Nov",
      December: "Dec",
    };
    let formattedText = text;
    Object.keys(monthMap).forEach((month) => {
      const regex = new RegExp(month, "gi");
      formattedText = formattedText.replace(regex, monthMap[month]);
    });
    return formattedText;
  };

  return (
    <article
      onClick={handleSeeDetails}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-40 overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={bill.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md ${
              status === "Paid"
                ? "bg-green-500/90 text-white"
                : "bg-amber-500/90 text-white"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded uppercase tracking-wide">
            {bill.category || "Utility"}
          </span>
          <div className="flex items-center text-slate-400 text-xs">
            <Clock size={12} className="mr-1" />
            {date}
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#009E67] transition-colors">
          {shortenMonthNames(bill.title)}
        </h3>

        <div className="space-y-2 mb-4 grow">
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin size={14} className="mr-2 text-[#009E67]" />
            <span className="truncate">{bill.location || "Location N/A"}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Amount</span>
            <span className="text-xl font-black text-[#009E67]">{price}</span>
          </div>
          <div className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-bold rounded-lg group-hover:bg-[#009E67] group-hover:text-white transition-colors">
            View Details
          </div>
        </div>
      </div>
    </article>
  );
}
