import api from "../api/axios";

export const getDashboardStats = async () => {

    const response = await api.get("/api/admin/stats");
    return response.data;
};