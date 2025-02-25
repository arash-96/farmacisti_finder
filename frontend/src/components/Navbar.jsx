import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaUser,
  // FaMapMarkerAlt,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("access") !== null
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(localStorage.getItem("access") !== null);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white fixed w-full top-0 left-0 z-50 shadow-lg rounded-b-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Left-aligned Brand */}
        <Link to="/" className="text-2xl font-bold">
          SOS Pharmacist
        </Link>

        {/* Right-aligned Icons */}
        <div className="flex items-center gap-6">
          <button className="md:hidden text-white text-2xl">☰</button>
          <nav className="hidden md:flex gap-6">
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:underline"
            >
              <FaUser /> Profilo
            </Link>
            {/* <Link to="/map" className="flex items-center gap-2 hover:underline">
              <FaMapMarkerAlt /> Mappa
            </Link> */}
            <Link
              to="/messages"
              className="flex items-center gap-2 hover:underline"
            >
              <FaEnvelope /> Messaggi
            </Link>
            {isLoggedIn && (
              <Link
                to="/login"
                onClick={handleLogout}
                className="flex items-center gap-2 hover:underline"
              >
                <FaSignOutAlt /> Logout
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
