import axios from "axios";
import api from "../api/axios";

export const login = async (email, password) => {
    const response = await api.post(`/api/auth/login`, {email, password});
    return response.data;
};

export const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await api.post(`/api/auth/logout`, {refreshToken});
    return response.data;
};

export const getAccessTokenByRefreshToken = async () => {

    const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh-token`,
        {
            refreshToken:
                localStorage.getItem("refreshToken")
        }
    );

    return response.data;
};