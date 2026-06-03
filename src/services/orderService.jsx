import api from "../api/axios";

export const createOrder = async () => {
    const response = await api.post(`/api/orders/place`);
    return response.data;
};

export const getMyOrders = async (page, size, sortBy) => {
    const response = await api.get(`/api/orders?page=${page}&size=${size}&sortBy=${sortBy}`);
    return response.data;
};