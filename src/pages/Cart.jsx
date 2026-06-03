import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { clearCart, getCart, increaseQuantity, decreaseQuantity, removeCartItem } from "../services/cartService";
import CartCard from "../components/cart/CartCard";
import { CartContext } from "../context/CartContext";

function Cart() {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    const { loadCart } = useContext(CartContext);

    useEffect(() => {
        loadCartPage();
    }, []);

    const loadCartPage = async () => {
        try {
            const data = await getCart();
            setCart(data);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (cartItemId) => {
        try {
            await removeCartItem(cartItemId);
            
            await loadCartPage();
            await loadCart();
        } catch(error) {
            console.error(error);
        }
    };

    const handleIncrease = async (cartItemId) => {
        try {
            await increaseQuantity(cartItemId);

            await loadCartPage();
            await loadCart();
        } catch(error) {
            console.error(error);
            alert( error.response?.data?.message || "Failed to increase quantity");
        }
    };

    const handleDecrease = async (cartItemId) => {
        try {
            await decreaseQuantity(cartItemId);

            await loadCartPage();
            await loadCart();
        } catch(error) {
            console.error(error);

            alert( error.response?.data?.message || "Failed to decrease quantity");
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();

            await loadCartPage();
            await loadCart();
        } catch(error) {
            console.error(error);
        }
    }

    if(loading) return <h2>Loading....</h2>;

    if (!cart || cart.items.length === 0) {
        return (
            <div>
                <h1>Cart</h1>

                <h2>Your cart is empty</h2>
            </div>
        );
    }

    return (
        <div>
            <h1>Cart</h1>

            {cart.items.map(cartItem => (
                <CartCard key={cartItem.cartItemId}
                            cartItem={cartItem}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease} 
                />
            ))}

            <h2>Total: ₹{cart.totalAmount}</h2>

            <div>
                <button onClick={handleClearCart}>
                    Clear Cart
                </button>

                <Link to="/checkout" >
                    <button>
                        Proceed to checkout
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Cart;