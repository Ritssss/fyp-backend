import React from "react";
// import img1 from "../assets/LandingPage/Image-1.png";
// import img2 from "../assets/LandingPage/Image-2.png";
// import img3 from "../assets/LandingPage/Image-3.png";

const HeroSection = () => (
  <main className="flex-1 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full px-8 py-8 relative">
    {/* Left: Text */}
    <div className="max-w-xl pt-8 pb-16 z-20">
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-2">
        Fun Meets Flavor
        <br />
        Become a Cooking Pro with
      </h1>
      <span className="text-accent block text-5xl md:text-6xl font-extrabold mb-2 mt-2">
        HomelyBites!
      </span>
      <p className="mt-6 text-gray-700 text-base md:text-lg">
        Discover delicious, personalized recipes based on what you have at home.
        Whether you're a beginner or a home chef, HomelyBites helps you cook
        with ease and confidence.
      </p>
      <button className="mt-8 text-white font-medium px-8 py-3 rounded-lg text-lg shadow hover:brightness-110 transition bg-accent">
        Get Started
      </button>
    </div>
    {/* Right: Images & Circles */}
    <div className="relative flex-1 flex items-center justify-center w-full h-[420px] md:h-auto min-w-[350px]">
      {/* Decorative Circles */}
      <div className="bg-accent absolute top-8 right-32 w-20 h-20 rounded-full opacity-50 z-0"></div>
      <div className="bg-accent absolute top-40 right-64 w-8 h-8 rounded-full opacity-50 z-0"></div>
      <div className="bg-accent absolute bottom-60 right-40 w-16 h-16 rounded-full opacity-80 z-0"></div>
      <div className="bg-accent absolute bottom-4 right-16 w-24 h-24 rounded-full opacity-50 z-0"></div>
      {/* Food Images */}
      <div className="relative w-full h-full">
        <img
          src="/Images/LandingPage/Image-1.png"
          alt="food1"
          className="absolute top-0 right-0 w-64 h-64 object-cover rounded-full shadow-xl border-4 border-white z-10"
        />
        <img
          src="/Images/LandingPage/Image-2.png"
          alt="food2"
          className="absolute bottom-0 right-40 w-48 h-48 object-cover rounded-full shadow-xl border-4 border-white z-10"
        />
        <img
          src="/Images/LandingPage/Image-3.png"
          alt="food3"
          className="absolute bottom-8 right-0 w-56 h-56 object-cover rounded-full shadow-xl border-4 border-white z-10"
        />
      </div>
    </div>
  </main>
);

export default HeroSection;
