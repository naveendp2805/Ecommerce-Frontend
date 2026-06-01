import { useState, useEffect } from "react";
import { getCart } from "../services/cartService";
import CartCard from "../components/cart/CartCard";

function Cart() {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const data = await getCart();
            setCart(data);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if(loading) return <h2>Loading....</h2>;

    return (
        <div>
            <h1>Cart</h1>

            {cart.items.map(cartItem => (
                <CartCard key={cartItem.productId} cartItem={cartItem} />
            ))}

            <h2>Total: ₹{cart.totalAmount}</h2>
        </div>
    );
}

export default Cart;