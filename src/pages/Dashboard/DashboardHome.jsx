import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FileText,
  DollarSign,
  CheckCircle2,
  Clock,
  Eye,
  Edit,
  Trash2,
  PlusCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import AuthContext from "../../provider/AuthContext";
import StatsCard from "./components/StatsCard";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's bills
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://utility-bill-server-eight.vercel.app/bills?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBills(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bills:", error);
          setLoading(false);
        });
    }
  }, [user]);

  // Calculate statistics
  const stats = {
    totalBills: bills.length,
    totalDue: bills
      .filter((bill) => bill.status !== "Paid")
      .reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0),
    paidBills: bills.filter((bill) => bill.status === "Paid").length,
    pendingBills: bills.filter((bill) => bill.status === "Pending").length,
  };

  // Category breakdown for pie chart
  const categoryData = bills.reduce((acc, bill) => {
    const category = bill.category || "Other";
    const existing = acc.find((item) => item.name === category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, []);

  // Monthly spending for bar chart
  const monthlyData = bills.reduce((acc, bill) => {
    const date = new Date(bill.date);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.amount += parseFloat(bill.amount || 0);
    } else {
      acc.push({ month, amount: parseFloat(bill.amount || 0) });
    }
    return acc;
  }, []);

  // Payment trend for line chart
  const paymentTrend = bills
    .filter((bill) => bill.status === "Paid")
    .reduce((acc, bill) => {
      const date = new Date(bill.date);
      const month = date.toLocaleDateString("en-US", { month: "short" });
      const existing = acc.find((item) => item.month === month);
      if (existing) {
        existing.payments += 1;
      } else {
        acc.push({ month, payments: 1 });
      }
      return acc;
    }, []);

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      fetch(`https://utility-bill-server-eight.vercel.app/bills/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            setBills(bills.filter((bill) => bill._id !== id));
            toast.success("Bill deleted successfully!");
          }
        })
        .catch((error) => {
          console.error("Error deleting bill:", error);
          toast.error("Failed to delete bill");
        });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Welcome back, {user?.displayName || "User"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your bills today.
          </p>
        </div>
        <Link
          to="/dashboard/add-bill"
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          <PlusCircle size={20} />
          Add Bill
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Bills"
          value={stats.totalBills}
          icon={FileText}
          color="green"
        />
        <StatsCard
          title="Amount Due"
          value={`৳${stats.totalDue.toFixed(2)}`}
          icon={DollarSign}
          color="orange"
        />
        <StatsCard
          title="Paid Bills"
          value={stats.paidBills}
          icon={CheckCircle2}
          color="blue"
        />
        <StatsCard
          title="Pending Bills"
          value={stats.pendingBills}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Monthly Spending
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Breakdown Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Bills by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Payment Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm lg:col-span-2"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Payment Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={paymentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="payments"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Bills Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recent Bills</h3>
            <Link
              to="/dashboard/my-bills"
              className="text-sm font-semibold text-green-600 hover:text-green-700"
            >
              View All →
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bills.slice(0, 5).map((bill) => (
                <tr
                  key={bill._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-slate-900">
                      {bill.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700">
                      {bill.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                    ৳{parseFloat(bill.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(bill.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        bill.status === "Paid"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/bill-details/${bill._id}`}
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={16} className="text-blue-600" />
                      </Link>
                      <Link
                        to={`/dashboard/edit-bill/${bill._id}`}
                        className="p-1.5 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} className="text-green-600" />
                      </Link>
                      <button
                        onClick={() => handleDelete(bill._id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bills.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No bills found</p>
              <Link
                to="/dashboard/add-bill"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <PlusCircle size={20} />
                Add Your First Bill
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
