import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="w-full flex items-center justify-between px-16 py-4">
    {/* Logo */}
    <Link to="/" className="flex items-center">
      <img
        src="/Images/logo/logo2.png"
        alt="HomelyBites Logo"
        className="h-10"
      />
    </Link>
    {/* Menu */}
    <div className="flex-1 flex justify-center">
      <div className="flex gap-10 text-lg font-medium">
        <Link to="/" className="hover:text-accent hover:underline hover:underline-offset-8 transition-transform">
          Home
        </Link>

        <Link to="/about" className="hover:text-accent hover:underline hover:underline-offset-8 transition-transform">
          About
        </Link>

        <Link
          to="/categories"
          className="hover:text-accent hover:underline hover:underline-offset-8 transition-transform  ">
          Categories
        </Link>

        <Link to="/contact" className="hover:text-accent hover:underline hover:underline-offset-8 transition-transform">
          Contact
        </Link>
      </div>
    </div>
    {/* Login Button */}
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-gray-700 cursor-pointer hover:text-gray-900"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </nav>
);

export default Navbar;
