import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon: Icon, color = "green", trend }) => {
  const colorClasses = {
    green: {
      bg: "bg-green-50",
      icon: "text-green-600",
      text: "text-green-700",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      text: "text-blue-700",
    },
    orange: {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      text: "text-orange-700",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      text: "text-purple-700",
    },
  };

  const colors = colorClasses[color] || colorClasses.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <h3 className="text-3xl font-black text-slate-900 mb-1">{value}</h3>
          {trend && (
            <p className={`text-xs font-semibold ${colors.text}`}>{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
