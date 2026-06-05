import api from "../api/axios";

export const getUsers = async (page = 0, size = 10) => {
    const response = await api.get(`/api/users?page=${page}&size=${size}`);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await api.put(`/api/users/${id}/admin`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
};