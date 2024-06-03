import { decodeToken } from "react-jwt";

export const TOKEN_KEY = "@rogu-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAdmin = () => {
    const dec = decodeToken(localStorage.getItem(TOKEN_KEY))
    if(dec.sub.replace("[","").replace("]","") === "ROLE_ADMIN"){
        return true;
    }
}
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const killToken = () => localStorage.clear();
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}