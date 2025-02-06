import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  const handleProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(localStorage.getItem("access") !== null);
    }, 1000); // Check every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* <Link to="/" className="navbar-brand">
        SOS Pharmacist
      </Link>
      <ul className="navbar-links"></ul>
      <div className="navbar-profile">
        {isLoggedIn ? (
          <>
            <button onClick={handleProfile} className="profile-button mr-7">
              Profilo
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        )}
      </div> */}
    </nav>
  );
}

export default Navbar;
