import React, { useContext } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin } from "lucide-react";
import AuthContext from "../../provider/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-slate-900">Profile</h1>
        <p className="text-gray-600 mt-1">View your account information</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-8">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-green-700 font-black text-4xl">
                  {user?.displayName?.charAt(0) ||
                    user?.email?.charAt(0) ||
                    "U"}
                </span>
              )}
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-black mb-1">
                {user?.displayName || "User"}
              </h2>
              <p className="opacity-90">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={16} />
                Display Name
              </label>
              <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                {user?.displayName || "Not set"}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} />
                Email Address
              </label>
              <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                {user?.email || "Not set"}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Phone size={16} />
                Phone Number
              </label>
              <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                {user?.phoneNumber || "Not set"}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} />
                Address
              </label>
              <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                Not set
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Account Information
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Created</span>
            <span className="font-semibold text-slate-900">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Sign In</span>
            <span className="font-semibold text-slate-900">
              {user?.metadata?.lastSignInTime
                ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email Verified</span>
            <span
              className={`font-semibold ${
                user?.emailVerified ? "text-green-600" : "text-orange-600"
              }`}
            >
              {user?.emailVerified ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
