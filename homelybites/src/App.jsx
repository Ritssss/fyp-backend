import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import LandingPage from "./pages/LandingPage";
import UserQuestion from "./pages/UserQuestion";
import Login from "./pages/login";
import MainPage from "./pages/MainPage";
import UserProfile from "./pages/UserProfile";
import CommunityPage from "./pages/CommunityPage";
import Post from "./pages/POst";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/userquestion" element={<UserQuestion />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/Home" element={<MainPage />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/post" element={<Post />} />
      {/* Redirect any unknown paths to the landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;