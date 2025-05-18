import React from "react";

const CategoryButton = ({ children, active, onClick }) => (
  <button
    className={`px-6 py-2 rounded-full font-semibold transition border text-base mb-2 md:mb-0 mr-2 md:mr-4 focus:outline-none ${
      active
        ? "bg-accent text-white border-accent"
        : "bg-white text-black border-gray-300 hover:bg-accent hover:text-white hover:border-accent"
    }`}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

export default CategoryButton;
