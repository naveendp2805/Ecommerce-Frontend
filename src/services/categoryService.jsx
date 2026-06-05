import api from "../api/axios";

export const getAllCategories = async () => {
    const response = await api.get("/api/categories");
    return response.data;
}

export const getCategoryById = async (id) => {
    const response = await api.get(`/api/categories/${id}`);
    return response.data;
};

export const addCategory = async (categoryName) => {
    const response = await api.post(`/api/categories`, categoryName);
    return response.data;
};

export const updateCategory = async (id, categoryName) => {
    const response = await api.put(`/api/categories/${id}`, categoryName);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await api.delete(`/api/categories/${id}`);
    return response.data;
};