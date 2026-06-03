import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/orderService";

function Checkout() {

    const { cart } = useContext(CartContext);

    const handlePlaceOrder = async () => {
        try {
            const order = await createOrder();

            console.log(order);
        } catch(error) {
            console.error(error);
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

            <button onClick={handlePlaceOrder}>
                Place Order
            </button>

        </div>
    );
}

export default Checkout;