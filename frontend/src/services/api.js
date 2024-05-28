import axios from "axios";
import { getToken } from "./auth";

const REST_API_BASE_URL = "http://localhost:8082/api/v1";

const api = axios.create({
    baseURL: REST_API_BASE_URL,
    responseType: 'json'
})

api.interceptors.request.use(async config => {
    const token = getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;