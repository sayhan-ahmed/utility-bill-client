import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Zap } from "lucide-react";
import { NavLink, Link } from "react-router";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-100/40 text-[#1E2631]">
      {/* -----Top: Logo Left, Social Right----- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="flex items-center justify-between">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-linear-to-br from-[#009E67] to-[#00875A] text-white shadow-md">
                <Zap size={20} className="fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Bill<span className="text-[#009E67]">Ease</span>
              </span>
            </Link>
            <p className="text-sm text-[#1E2631]/70 mt-3 max-w-xs">
              BillEase helps you view, track, and pay your monthly utility bills
              securely in one place.
            </p>
          </div>

          {/* socials */}
          <div className="hidden sm:flex items-center gap-3 text-[#1E2631]/80">
            <a href="#" className="btn-social group">
              <FaFacebookF className="btn-social-icon" />
            </a>

            <a href="#" className="btn-social group">
              <FaXTwitter className="btn-social-icon" />
            </a>

            <a href="#" className="btn-social group">
              <FaInstagram className="btn-social-icon" />
            </a>

            <a href="#" className="btn-social group">
              <FaPinterestP className="btn-social-icon" />
            </a>
          </div>
        </div>
        <hr className="mt-6 border-[#1E2631]/10" />
      </div>

      {/* -----Middle: Contact, Links, Newsletter----- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact US</h4>
          <div className="space-y-4">
            {/* phone */}
            <div className="group flex items-center gap-3">
              <span className="icon-box">
                <FiPhone className="opacity-80" />
              </span>
              <p className="text-sm opacity-80">+880 123 456 7890</p>
            </div>
            {/* address */}
            <div className="group flex items-center gap-3">
              <span className="icon-box">
                <FiMapPin className="opacity-80" />
              </span>
              <p className="text-sm opacity-80">Mirpur-10, Dhaka, Bangladesh</p>
            </div>
            {/* email */}
            <div className="group flex items-center gap-3">
              <span className="icon-box">
                <FiMail className="opacity-80" />
              </span>
              <p className="text-sm opacity-80">support@billease.app</p>
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-3 text-sm text-[#1E2631]/80">
            {[
              { to: "/", label: "Home" },
              { to: "/bills", label: "All Bills" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact Support" },
            ].map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className="inline-block transition-all duration-300 ease-out hover:text-green-700 hover:translate-x-1 hover:scale-105"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Access */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Access</h4>
          <ul className="space-y-3 text-sm text-[#1E2631]/80">
            {[
              { to: "/help-center", label: "Help Center" },
              { to: "/terms-conditions", label: "Terms & Conditions" },
              { to: "/privacy-policy", label: "Privacy Policy" },
            ].map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className="inline-block transition-all duration-300 ease-out hover:text-green-700 hover:translate-x-1 hover:scale-105"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-sm opacity-80 mb-4">
            Get monthly updates about bills, payments, and new features.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            <div
              className="rounded-full bg-white shadow-sm flex items-center
                            px-4 py-3 transition focus-within:shadow-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 outline-none bg-transparent text-sm"
              />
            </div>

            <button type="submit" className="btn-primary">
              SUBSCRIBE NOW
            </button>
          </form>
        </div>
      </div>

      {/* -----Bottom: Copyright & Developer----- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <hr className="border-[#1E2631]/10 mb-4" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#1E2631]/60">
          <p>© {new Date().getFullYear()} BillEase — All Rights Reserved</p>
          <p className="flex items-center gap-1">
            Developed by{" "}
            <a
              href="https://sayhan-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Sayhan Ahmed
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
