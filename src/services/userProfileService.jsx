import api from "../api/axios";

export const getProfile = async () => {
    const response = await api.get(`/api/profile`);
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put(`/api/profile`, profileData);
    return response.data;
};

export const uploadProfileImage = async (file) => {

    const formData = new FormData();

    formData.append("image", file);

    const response = await api.post(`/api/profile/image`,
        formData, 
        {
            headers: {"Content-Type": "multipart/form-data"}
        }
    );

    return response.data;
};

export const deleteProfileImage = async () => {
    const response = await api.delete(`/api/profile/image`);
    return response.data;
};