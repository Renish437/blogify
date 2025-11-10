import { createContext, useState, useEffect } from "react";
import { token } from "../common/Config";
import { jwtDecode } from "jwt-decode";// You need to install: npm install jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Helper: Decode token and check if expired
  const decodeAndValidateToken = (token) => {
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds

      // If token is expired
      if (decoded.exp < currentTime) {
        localStorage.removeItem("blogifyUserToken");
        return null;
      }

      return decoded; // or return token if you store user info in localStorage separately
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("blogifyUserToken");
      return null;
    }
  };

  // Initialize user on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("blogifyUserToken");
    if (storedToken) {
      const userData = decodeAndValidateToken(storedToken);
      setUser(userData);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("blogifyUserToken", token);
    const userData = decodeAndValidateToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("blogifyUserToken");
    setUser(null);
  };

  const isLoggedIn = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};