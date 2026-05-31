import api from "../api/axios";

export const getAllCategories = async () => {
    const response = await api.get("/api/categories");
    return response.data;
}