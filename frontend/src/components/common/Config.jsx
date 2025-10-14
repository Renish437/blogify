export const apiUrl = import.meta.env.VITE_API_URL;


export const token =()=>{
   const userInfo= localStorage.getItem("blogifyUserToken");
   return userInfo ? JSON.parse(userInfo).token :null;
}