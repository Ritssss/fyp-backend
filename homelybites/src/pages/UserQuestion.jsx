import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const dietaryOptions = ["Vegetarian", "Keto", "Gluten-free", "Vegan"];
const allergyOptions = [
  "Lactose Intolerance",
  "Nut Allergy",
  "Gluten Intolerance",
  "Shellfish Allergy",
];
const dislikeOptions = [
  "Lactose Intolerance",
  "Nut Allergy",
  "Gluten Intolerance",
  "Shellfish Allergy",
];

const UserQuestion = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/"); // Navigate to the home/main page
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-grow px-2 md:px-0">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full mt-8 mb-8 relative">
          <div className="flex">
            <div className="w-full pr-0 md:pr-20">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
                Help us get to know your taste
              </h1>
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Q1 */}
                <div>
                  <div className="mb-2 text-lg">
                    1. Select your Dietary Preferences ?
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
                    {dietaryOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-lg"
                      >
                        <input type="checkbox" className="accent-accent w-5 h-5" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Q2 */}
                <div>
                  <div className="mb-2 text-lg">
                    2. Do you have any food allergies or intolerances ?
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
                    {allergyOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-lg"
                      >
                        <input type="checkbox" className="accent-accent w-5 h-5" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Q3 */}
                <div>
                  <div className="mb-2 text-lg">
                    3. Are there any ingredients you dislike or want to avoid ?
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
                    {dislikeOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-lg"
                      >
                        <input type="checkbox" className="accent-accent w-5 h-5" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-accent text-white px-8 py-2 rounded-lg text-lg shadow hover:brightness-110 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="hidden md:block w-1/3">
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-1/3">
                <img 
                  src="/Images/chef-illustration.png" 
                  alt="Chef Illustration" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserQuestion;