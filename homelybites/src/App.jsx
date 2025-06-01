import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from "./pages/signup";
import LandingPage from "./pages/LandingPage";
import UserQuestion from "./pages/UserQuestion";
import Login from "./pages/login";
import MainPage from "./pages/MainPage";
import UserProfile from "./pages/UserProfile";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import CommunityPage from "./pages/CommunityPage";
import Post from "./pages/Post";




function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/signup" element={<SignUpRoute />} />
      <Route path="/userquestion" element={<UserQuestionRoute />} />
      <Route path="/Home" element={<MainPage />} />
      <Route path="/" element={<RootRoute />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/post" element={<Post />} />
      {/* Redirect any unknown paths to the landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;