import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t px-4 py-6 text-center text-sm opacity-70">
      © {new Date().getFullYear()} Utility Bills — All rights reserved.
    </footer>
  );
};

export default Footer;
