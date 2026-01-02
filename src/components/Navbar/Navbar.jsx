import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home as HomeIcon,
  CreditCard,
  Zap,
  LayoutDashboard,
  BarChart3,
  History,
  Mail,
  ArrowRight,
  User as UserIcon,
} from "lucide-react";
import AuthContext from "../../provider/AuthContext";
import toast from "react-hot-toast";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    toast.promise(
      logOut()
        .then(() => {
          navigate("/login");
          setDropdownOpen(false);
        })
        .catch((err) => {
          throw new Error(`Logout failed: ${err.message}`);
        }),
      {
        loading: "Logging out...",
        success: <b>Logged out successfully!</b>,
        error: (err) => <b>{err.message}</b>,
      }
    );
  };

  const navLinks = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/bills", label: "Manage Bills", icon: CreditCard },
    ...(user?.email
      ? [
          { to: "/my-bills", label: "Payments", icon: History },
          { to: "/#statistics", label: "Stats", icon: BarChart3 },
          { to: "/contact", label: "Contact", icon: Mail },
        ]
      : [
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ]),
  ];

  const closeMenu = () => setOpen(false);

  const LinkItem = ({ to, children, icon: Icon }) => (
    <NavLink
      to={to}
      onClick={closeMenu}
      className={({ isActive }) =>
        `relative px-5 py-2.5 text-sm font-bold transition-all duration-500 group flex items-center gap-2 rounded-full
         ${
           isActive
             ? "bg-[#009E67] text-white shadow-lg shadow-green-100"
             : "text-slate-700 hover:text-[#009E67] hover:bg-green-50"
         }`
      }
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      <span className="relative z-10">{children}</span>
    </NavLink>
  );

  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-500 border-b border-slate-200/90 shadow-xs">
        <div
          className="relative w-full flex items-center justify-between transition-all duration-700 border-b border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)] group"
          style={{
            height: "80px",
            padding: "0 2rem",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {/* Premium Gradient Mesh Overlay */}
          <div className="absolute inset-0 opacity-40 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,158,103,0.04),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(16,185,129,0.03),transparent_50%)]" />
          </div>

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3.5 group/logo relative z-10"
          >
            <motion.div
              style={{ scale: logoScale }}
              whileHover={{ rotate: 15, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center h-11 w-11 md:h-12 md:w-12 rounded-2xl bg-linear-to-br from-[#009E67] to-[#00875A] text-white shadow-[0_4px_16px_rgba(0,158,103,0.25)] relative overflow-hidden group/zap"
            >
              <Zap
                size={24}
                className="fill-white relative z-10 transition-transform duration-500 group-hover/zap:scale-125"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                Bill
                <span className="text-[#009E67] relative inline-block">
                  Ease
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#009E67] origin-left"
                  />
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 z-10">
            {navLinks.map((link) => (
              <LinkItem
                key={link.label + link.to}
                to={link.to}
                icon={link.icon}
              >
                {link.label}
              </LinkItem>
            ))}
          </div>

          {/* User Profile Dropdown - Right */}
          <div className="hidden lg:flex items-center z-10">
            {user?.email ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 group relative overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={user.photoURL || "https://i.pravatar.cc/100?u=test"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover border-2 border-white ring-2 ring-slate-100 group-hover:ring-green-400/40 transition-all shadow-sm"
                    />
                    <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                      Member
                    </span>
                    <span className="font-bold text-slate-800 leading-tight">
                      {user.displayName?.split(" ")[0]}
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-500 ${
                      dropdownOpen ? "rotate-180 text-green-600" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.92,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 15,
                        scale: 0.94,
                      }}
                      transition={{
                        type: "spring",
                        damping: 28,
                        stiffness: 350,
                      }}
                      className="absolute right-0 mt-4 w-80 rounded-3xl bg-white border border-slate-200/80 shadow-[0_20px_70px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.05)] overflow-hidden"
                      style={{ zIndex: 9999 }}
                    >
                      {/* Gradient Header Background */}
                      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-br from-[#009E67]/5 via-emerald-50/50 to-transparent pointer-events-none" />

                      {/* User Info Section */}
                      <div className="relative px-6 py-6 mb-1">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={
                                user.photoURL ||
                                "https://i.pravatar.cc/100?u=test"
                              }
                              className="h-16 w-16 rounded-2xl object-cover ring-4 ring-white shadow-xl shadow-slate-900/10"
                              alt=""
                            />
                            <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 border-[3px] border-white rounded-full shadow-sm" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="font-black text-lg text-slate-900 leading-tight truncate">
                              {user.displayName || "User"}
                            </p>
                            <p className="text-sm text-[#009E67] font-semibold tracking-tight truncate mt-0.5">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="px-3 pb-3 space-y-1">
                        <DropdownItem
                          icon={LayoutDashboard}
                          label="Dashboard"
                          delay={0.05}
                          onClick={() => {
                            setDropdownOpen(false);
                          }}
                        />
                      </div>

                      {/* Logout Section */}
                      <div className="px-3 pb-3 pt-2 border-t border-slate-100">
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          onClick={handleLogout}
                          className="w-full flex items-center justify-between px-4 py-3.5 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 group/logout"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-50 rounded-xl group-hover/logout:bg-red-600 group-hover/logout:text-white transition-all duration-300">
                              <LogOut size={18} />
                            </div>
                            <span className="font-bold text-sm">Sign Out</span>
                          </div>
                          <ArrowRight
                            size={16}
                            className="opacity-0 -translate-x-2 group-hover/logout:opacity-100 group-hover/logout:translate-x-0 transition-all duration-300"
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-700 hover:text-[#009E67] transition-colors px-4 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-bold bg-[#009E67] text-white px-7 py-3 rounded-full hover:bg-[#00875A] transition-all active:scale-95 shadow-lg shadow-green-100"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all text-slate-600"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 lg:hidden shadow-[-20px_0_50px_rgba(0,0,0,0.05)] flex flex-col"
            >
              <div className="p-8 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-100">
                    <Zap size={22} className="fill-white" />
                  </div>
                  <span className="font-black text-2xl tracking-tighter text-slate-900">
                    BillEase
                  </span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.label}
                      to={link.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-5 py-4.5 rounded-3xl transition-all duration-300 ${
                          isActive
                            ? "bg-green-600 text-white shadow-xl shadow-green-100 translate-x-1"
                            : "text-slate-600 hover:bg-slate-50"
                        }`
                      }
                    >
                      {Icon && <Icon size={20} />}
                      <span className="text-lg font-bold">{link.label}</span>
                    </NavLink>
                  );
                })}

                <div className="my-8 h-px bg-slate-50" />

                {user?.email ? (
                  <div className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-4 mb-8">
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="h-16 w-16 rounded-[1.25rem] border-4 border-white shadow-lg shadow-slate-200"
                      />
                      <div className="overflow-hidden">
                        <p className="font-black text-xl leading-tight text-slate-900 truncate">
                          {user.displayName}
                        </p>
                        <p className="text-sm font-medium text-slate-400 truncate mt-1">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <button className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-white hover:bg-white hover:shadow-md transition-all border border-slate-100">
                        <LayoutDashboard size={22} className="text-green-600" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                          Dash
                        </span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-white hover:bg-white hover:shadow-md transition-all border border-slate-100"
                      >
                        <LogOut size={22} className="text-red-500" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                          Exit
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="w-full py-5 text-center font-black text-slate-600 border-2 border-slate-100 rounded-3xl hover:bg-slate-50 transition-colors"
                    >
                      Login Account
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="w-full py-5 text-center font-black bg-green-600 text-white rounded-3xl shadow-2xl shadow-green-100 active:scale-95 transition-all"
                    >
                      Create Free Account
                    </Link>
                  </div>
                )}
              </div>

              <div className="p-10 text-center text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">
                &copy; 2026 BillEase
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const DropdownItem = ({
  icon: Icon,
  label,
  description,
  onClick,
  delay = 0,
}) => (
  <motion.button
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-linear-to-r hover:from-[#009E67]/5 hover:to-emerald-50/50 rounded-2xl transition-all duration-300 group relative"
  >
    <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-[#009E67] group-hover:text-white group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-300">
      <Icon size={18} />
    </div>
    <div className="flex flex-col text-left flex-1">
      <span className="font-bold text-sm text-slate-900 leading-none">
        {label}
      </span>
      {description && (
        <span className="text-[11px] font-medium text-slate-400 mt-1 tracking-wide">
          {description}
        </span>
      )}
    </div>
    <ArrowRight
      size={14}
      className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#009E67] transition-all duration-300"
    />
  </motion.button>
);

export default Navbar;
