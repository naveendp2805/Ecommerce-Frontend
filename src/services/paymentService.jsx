import api from "../api/axios";

export const createPaymentOrder = async (orderId) => {
    const response = await api.post(`/api/payment/create-order`, {orderId});
    return response.data;
};

export const verifyPaymentOrder = async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    const response = await api.post(`/api/payment/verify`, {razorpayOrderId, razorpayPaymentId, razorpaySignature});
    return response.data;
};