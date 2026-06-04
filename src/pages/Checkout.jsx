import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../services/orderService";
import {createPaymentOrder, verifyPaymentOrder} from "../services/paymentService";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import PageWrapper from "../layouts/PageWrapper";

function Checkout() {

    const navigate = useNavigate();

    const { cart } = useContext(CartContext);

    const [loading, setLoading] = useState(false);

    const { loadCart } = useContext(CartContext);

    const handlePlaceOrder = async () => {

        setLoading(true);

        try {
            const order = await placeOrder();

            console.log(order);

            alert("Order created successfully");

            const paymentOrder = await createPaymentOrder(order.orderId);

            const options = {

                key: paymentOrder.key,

                amount: paymentOrder.amountInPaise,

                currency: paymentOrder.currency,

                order_id: paymentOrder.razorpayOrderId,

                name: "Naveen Ecommerce",

                description: "Order Payment",

                handler: async (response) => {
                    try {

                        await verifyPaymentOrder(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);

                        navigate("/payment-success");
                    } catch(error) {

                        console.error(error);

                        alert("Payment Verification Failed");
                    }
                }

            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

            await loadCart();
        } catch(error) {
            console.error(error);

            alert(error.response?.data?.message || "Payment Failed");
        } finally {
            setLoading(false);
        }
    };


    if (!cart || cart.items.length === 0) {
        return (
            <div>
                <h1>Checkout</h1>
                <h2>Your cart is empty</h2>
            </div>
        );
    }

    return (
        <PageWrapper title="Checkout" >
            <div className="checkout-container">

                <h2>Order Summary</h2>

                {cart.items.map(item => (

                    <div key={item.cartItemId} className="checkout.item">

                        <h3>{item.productName}</h3>

                        <p>Price: ₹{item.price}</p>

                        <p>Quantity: {item.quantity}</p>

                        <p>Subtotal: ₹{item.subTotal}</p>

                        <hr />

                    </div>

                ))}

                <h2 className="checkout-total">Total Amount: ₹{cart.totalAmount}</h2>

                <button className="checkout-button" onClick={handlePlaceOrder} disabled={loading} >
                    {
                        loading ? "Placing Order" : "Place Order"
                    }
                </button>

            </div>
        </PageWrapper>
    );
}

export default Checkout;