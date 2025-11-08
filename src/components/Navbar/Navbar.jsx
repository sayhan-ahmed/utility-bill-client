import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full border-b px-4 py-3 flex items-center justify-between">
      <a href="/" className="font-bold">
        Utility Bills
      </a>
      <div className="flex gap-4 text-sm">
        <a href="/bills">Bills</a>
        <a href="/my-bills">My Pay Bills</a>
        <a href="/auth/login">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
