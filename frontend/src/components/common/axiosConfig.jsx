import axios from "axios"

const instance = axios.create({
    baseURL:"http://192.168.18.10:8000/api"
})
instance.interceptors.response.use((response)=>{
    return response.data;
})
export default instance