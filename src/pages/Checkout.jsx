import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../services/orderService";

function Checkout() {

    const { cart } = useContext(CartContext);

    const [loading, setLoading] = useState(false);

    const { loadCart } = useContext(CartContext);

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);

            const order = await placeOrder();

            console.log(order);

            alert("Order created successfully");

            await loadCart();
        } catch(error) {
            console.error(error);

            alert(error.response?.data?.message || "Failed to place Order");
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
        <div>

            <h1>Checkout</h1>

            <h2>Order Summary</h2>

            {cart.items.map(item => (

                <div key={item.cartItemId}>

                    <h3>{item.productName}</h3>

                    <p>Price: ₹{item.price}</p>

                    <p>Quantity: {item.quantity}</p>

                    <p>Subtotal: ₹{item.subTotal}</p>

                    <hr />

                </div>

            ))}

            <h2>Total Amount: ₹{cart.totalAmount}</h2>

            <button onClick={handlePlaceOrder} disabled={loading} >
                {
                    loading ? "Placing Order" : "Place Order"
                }
            </button>

        </div>
    );
}

export default Checkout;