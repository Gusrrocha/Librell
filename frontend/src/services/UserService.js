import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/api/v1/user";
    


export const getUser = (email) => axios.post(REST_API_BASE_URL+"/getOne", email);
export const updateInfo = (user, id) => axios.put(REST_API_BASE_URL+`/update/${id}`, user);
export const updatePw = (user, id) => axios.put(REST_API_BASE_URL+`/update/password/${id}`,user);
export const createUser = (user) => axios.post(REST_API_BASE_URL+"/cadastro", user);
export const loginUser = (user) => axios.post(REST_API_BASE_URL+"/login", user);