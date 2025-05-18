import React from "react";

const Footer = () => (
  <footer className="bg-accent text-white text-center py-4 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-base">
      <span>© 2025 HomelyBites</span>
      <span className="hidden md:inline">|</span>
      <a href="#" className="hover:underline">
        Privacy Policy
      </a>
      <span className="hidden md:inline">|</span>
      <a href="#" className="hover:underline">
        Terms & Conditions
      </a>
    </div>
  </footer>
);

export default Footer;
