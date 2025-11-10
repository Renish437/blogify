import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("blogifyUserToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
          logout(); // Force logout if expired
        }
      } catch (error) {
        logout(); // Invalid token
      }
    }
  }, [location, logout]); // Re-check on route change

  if (!user) {
    // Redirect to login but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;