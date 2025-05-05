import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

function ProtectedRoute({ children, requiredRole = null }) {
  const [status, setStatus] = useState("loading"); // 'loading' | 'unauthenticated' | 'unauthorized' | 'authorized'

  useEffect(() => {
    checkAuth().catch(() => setStatus("unauthenticated"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", { refresh });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed", error);
    }
    return false;
  };

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) return setStatus("unauthenticated");

    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      const refreshed = await refreshToken();
      if (!refreshed) return setStatus("unauthenticated");
    }

    try {
      const res = await api.get("/api/user/details/");
      const userRole = res.data.profile.userRole;

      if (
        !requiredRole ||
        userRole === requiredRole ||
        (Array.isArray(requiredRole) && requiredRole.includes(userRole))
      ) {
        setStatus("authorized");
      } else {
        setStatus("unauthorized");
      }
    } catch (err) {
      console.error("User role fetch failed", err);
      setStatus("unauthenticated");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" />;
  }

  if (status === "unauthorized") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;
