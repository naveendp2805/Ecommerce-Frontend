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

export const addProduct = async (formData) => {
    const response = await api.post(`/api/products`, formData, {headers: {"Content-Type": "multipart/form-data"}});
    return response.data;
};

export const updateProduct = async (id, formData) => {
    const response = await api.put(`/api/products/${id}`, formData, {headers: {"Content-Type": "multipart/form-data"}});
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
};