import axios from "axios"
import { token } from "./Config";

const instance = axios.create({
    baseURL:"http://127.0.0.1:8000/api"
})
instance.interceptors.response.use((response)=>{
    return response.data;
},(error)=>{
    if (error.response?.status === 401) {
        window.location.href="/login"
    }
})
instance.interceptors.request.use((config)=>{
    const tokenString = token();
    if(tokenString){
        config.headers.Authorization = `Bearer ${tokenString}`
    }
    return config;
   
})
export default instance