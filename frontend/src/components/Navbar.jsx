import "../styles/Navbar.css";
import { Link } from "react-router-dom";
// import { useState } from "react";

function Navbar() {
    // const [isLoggedIn, setIsLoggedIn] = useState(); 

//   const toggleLogin = () => {
//     if (isLoggedIn) {
//       localStorage.clear();
//     }
//     setIsLoggedIn(!isLoggedIn);
//   };
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SOS Pharmacist
      </Link>
      <ul className="navbar-links">
      </ul>
      {/* <div className="navbar-profile">
        {isLoggedIn ? (
          <button onClick={toggleLogin} className="logout-button" href="/logout">Logout</button>
        ) : (
          <button onClick={toggleLogin} className="login-button" href="/login">Login</button>
        )}
      </div> */}
    </nav>
  );
}

export default Navbar;