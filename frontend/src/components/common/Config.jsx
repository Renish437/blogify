export const apiUrl = import.meta.env.VITE_API_URL;
const userInfo = localStorage.getItem("user-blog");
export const token = userInfo ? JSON.parse(userInfo)?.token : null;
