import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "../../provider/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.promise(
      logOut()
        .then(() => {
          navigate("/login");
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

  const links = user?.email
    ? [
        { to: "/", label: "Home" },
        { to: "/bills", label: "Bills" },
        { to: "/my-bills", label: "My Pay Bills" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/bills", label: "Bills" },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  const closeMenu = () => setOpen(false);

  const LinkItem = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={closeMenu}
      className={({ isActive }) =>
        `inline-block px-3 py-1 text-base font-semibold transition-all duration-300 ease-out
         hover:text-green-700 hover:scale-110 
         ${isActive ? "text-green-700 font-extrabold" : "text-gray-700"}`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center gap-2 select-none">
            <span className="brand-logo">B</span>
            <span className="text-2xl font-bold text-gray-800">
              Bill<span className="text-green-600">Ease</span>
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <LinkItem key={l.to} to={l.to}>
              {l.label}
            </LinkItem>
          ))}

          {/* Auth area */}
          {user?.email && (
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL || "https://i.pravatar.cc/40"}
                alt={user.displayName || "User"}
                title={user.displayName || user.email}
                className="h-9 w-9 rounded-full border-2 border-green-600 object-cover shadow-sm"
              />
              <button
                onClick={handleLogout}
                className="text-sm px-5 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 active:scale-95 transition hover:cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden transition-[max-height] duration-300 ease-out overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col gap-3 border-t bg-white">
          {links.map((l) => (
            <LinkItem key={l.to} to={l.to}>
              {l.label}
            </LinkItem>
          ))}

          {/* User + Logout on Mobile */}
          {user?.email && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/40"}
                  alt="Profile"
                  className="h-9 w-9 rounded-full border object-cover"
                />
                <span className="text-sm text-gray-700 truncate max-w-[120px]">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-full hover:bg-green-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
