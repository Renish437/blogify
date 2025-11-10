import { jwtDecode } from "jwt-decode";
export const apiUrl = import.meta.env.VITE_API_URL;




export const token = () => {
  const storedToken = localStorage.getItem("blogifyUserToken");
  if (!storedToken) return null;

  try {
    const decoded = jwtDecode(storedToken);
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("blogifyUserToken");
      return null;
    }
    return storedToken;
  } catch {
    localStorage.removeItem("blogifyUserToken");
    return null;
  }
};