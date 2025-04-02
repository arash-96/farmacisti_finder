import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import LoginWithEmail from "./pages/LoginWithEmail";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchOffers from "./pages/SearchOffers";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Farmacie from "./pages/Farmacie";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Footer from "./components/Footer";
import MyOffers from "./pages/MyOffers";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function AppContent() {
  const location = useLocation();

  const showNavbarAndFooter =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/logout" &&
    location.pathname !== "/login_email" &&
    location.pathname !== "/forgot-password" &&
    location.pathname !== "/terms" &&
    location.pathname !== "/privacy" &&
    !location.pathname.startsWith("/reset-password/");

  return (
    <>
      {showNavbarAndFooter && <Navbar />}
      <div className={`min-h-screen ${showNavbarAndFooter ? "pt-20" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cerca_offerte"
            element={
              <ProtectedRoute>
                <SearchOffers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmacie"
            element={
              <ProtectedRoute>
                <Farmacie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mie_offerte"
            element={
              <ProtectedRoute>
                <MyOffers />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login_email" element={<LoginWithEmail />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showNavbarAndFooter && <Footer />}
      </div>

    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
