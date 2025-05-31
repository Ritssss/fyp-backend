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

// Component to handle root path logic
const RootRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const user = JSON.parse(currentUser);
          setIsLoggedIn(user.isLoggedIn === true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return isLoggedIn ? <Navigate to="/Home" replace /> : <LandingPage />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/userquestion" element={<UserQuestion />} />
      <Route path="/Home" element={<MainPage />} />
      <Route path="/" element={<RootRoute />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/post" element={<Post />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;