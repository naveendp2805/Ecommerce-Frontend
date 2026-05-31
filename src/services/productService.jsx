import api from "../api/axios";

export const getAllProducts = async () => {
    const response = await api.get(`/api/products`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
};

export const getProductsByPage = async (page=0, size=5, sortBy="id", direction="asc") => {
    const response = await api.get(`/api/products/paged?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`);
    return response.data;
};

export const getProductsByCategory = async (categoryId) => {
    const response = await api.get(`/api/products/category?categoryId=${categoryId}`);
    return response.data;
};