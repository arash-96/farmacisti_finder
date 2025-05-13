import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("access") !== null
  );
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white fixed w-full top-0 left-0 z-50 shadow-lg rounded-b-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">
          SOS Pharmacist
        </Link>
        <div className="flex items-center gap-6">
          <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>☰</button>
          <nav className="hidden md:flex gap-6">
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:underline"
            >
              <FaUser /> Profilo
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
      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-600 px-4 py-2 flex flex-col gap-3">
          <Link
            to="/profile"
            className="flex items-center gap-2 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser /> Profilo
          </Link>
          {isLoggedIn && (
            <Link
              to="/login"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:underline"
            >
              <FaSignOutAlt /> Logout
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
