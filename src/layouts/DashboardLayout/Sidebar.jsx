import React from "react";
import { NavLink } from "react-router";
import { LayoutDashboard, FileText, PlusCircle, User, X } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard Home",
      end: true,
    },
    {
      path: "/dashboard/my-bills",
      icon: FileText,
      label: "My Bills",
    },
    {
      path: "/dashboard/add-bill",
      icon: PlusCircle,
      label: "Add Bill",
    },
    {
      path: "/dashboard/profile",
      icon: User,
      label: "Profile",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-linear-to-br from-[#009E67] to-[#00875A] text-white shadow-md">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="text-xl font-black text-slate-900">Dashboard</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-green-50 text-green-700 font-semibold shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      className={isActive ? "text-green-700" : "text-gray-500"}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-semibold text-green-900 mb-1">
              Need Help?
            </p>
            <p className="text-xs text-green-700 mb-3">
              Check our help center for guides
            </p>
            <NavLink
              to="/help-center"
              className="block text-center text-xs font-semibold text-green-700 hover:text-green-800 transition-colors"
            >
              Visit Help Center →
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
