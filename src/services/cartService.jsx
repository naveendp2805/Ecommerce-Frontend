import api from "../api/axios";

export const addToCart = async (productId, quantity=1) => {
    const response = await api.post(`/api/cart/add`, {productId, quantity});
    return response.data;
};

export const getCart = async () => {
    const response = await api.get(`/api/cart`);
    return response.data;
};

export const removeCartItem = async (cartItemId) => {
    const response = await api.delete(`/api/cart/item/${cartItemId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete(`/api/cart/clear`);
    return response.data;
};