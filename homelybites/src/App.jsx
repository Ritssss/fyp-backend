import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import LandingPage from "./pages/LandingPage";
import UserQuestion from "./pages/UserQuestion";
import Login from "./pages/login";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/userquestion" element={<UserQuestion />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;