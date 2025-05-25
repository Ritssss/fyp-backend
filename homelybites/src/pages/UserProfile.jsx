import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const UserProfile = () => {
  const navigate = useNavigate();

  // State for user information - Get from localStorage if available
  const [userInfo, setUserInfo] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return {
      username: currentUser.firstName && currentUser.lastName 
        ? `${currentUser.firstName} ${currentUser.lastName}` 
        : "Anushka Shakya",
      email: currentUser.email || "aanu332@gmail.com",
      phone: currentUser.phone || "",
      password: ""
    };
  });

  // State for dietary preferences
  const [dietaryPlan, setDietaryPlan] = useState("Non-Vegetarian");
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // State for form validation
  const [errors, setErrors] = useState({});

  const dietaryOptions = [
    "Vegetarian",
    "Non-Vegetarian", 
    "Keto",
    "Gluten Free",
    "No Dietary Plan"
  ];

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user makes changes
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleDietaryChange = (option) => {
    setDietaryPlan(option);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userInfo.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Email format is invalid";
    }
    
    // Phone number is optional - no validation required
    
    if (userInfo.password && userInfo.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically save to backend
      console.log("Saving user data:", { ...userInfo, dietaryPlan });
      alert("Changes saved successfully!");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="h-screen bg-[#faf9f7] flex flex-col overflow-hidden">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      

      <div className="flex-1 px-4 md:px-8 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
            
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-6 flex flex-col">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#ff6b6b] mb-6 hover:opacity-80 transition-opacity"
              >
                <span className="text-xl">←</span>
                <span className="text-lg font-medium">Back</span>
              </button>
              
              {/* Profile Section */}
              <div className="text-center mb-6 flex-shrink-0">
                <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-3 shadow-lg">
                  <img 
                    src="/Images/user.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="bg-[#ff6b6b] text-white px-4 py-2 rounded-md text-sm hover:brightness-110 transition-all duration-200">
                  Change Profile
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <h3 className="text-lg font-bold mb-4 font-inter">Change Dietary Plan</h3>
                <div className="space-y-2">
                  {dietaryOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          name="dietary"
                          value={option}
                          checked={dietaryPlan === option}
                          onChange={() => handleDietaryChange(option)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          dietaryPlan === option 
                            ? 'bg-[#ff6b6b] border-[#ff6b6b]' 
                            : 'bg-gray-200 border-gray-300'
                        }`}>
                          {dietaryPlan === option && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-base">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl p-6 flex flex-col">
              
              <h2 className="text-xl font-bold mb-6">Account Information</h2>
              
              <form onSubmit={handleSaveChanges} className="flex-1 flex flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {/* Username */}
                  <div>
                    <label className="block text-base font-medium mb-2">Username</label>
                    <input
                      type="text"
                      value={userInfo.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={`w-full px-3 py-2.5 border rounded-lg text-base focus:outline-none ${
                        errors.username ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your username"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-base font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2.5 border rounded-lg text-base focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-base font-medium mb-2">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-3 py-2.5 border rounded-lg text-base focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  {/* Password */}
                  <div>
                    <label className="block text-base font-medium mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={userInfo.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full px-3 py-2.5 border rounded-lg text-base focus:outline-none pr-10 ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter new password (leave blank to keep current)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">
                      Password must be at least 8 characters with letters, numbers and symbols
                    </p>
                  </div>
                </div>
                
                {/* Save Button - Fixed at bottom */}
                <div className="pt-4 flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full bg-[#ff6b6b] text-white py-2.5 rounded-lg text-base font-medium hover:brightness-110 transition-all duration-200 shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Footer */}
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;