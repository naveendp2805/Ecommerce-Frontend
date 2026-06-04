import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, getCart, increaseQuantity, decreaseQuantity, removeCartItem } from "../services/cartService";
import CartCard from "../components/cart/CartCard";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import PageWrapper from "../layouts/PageWrapper";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import { FaShoppingCart } from "react-icons/fa";

function Cart() {

    const navigate = useNavigate();

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

    const handleIncrease = async (cartItemId) => {
        try {
            await increaseQuantity(cartItemId);

            await loadCartPage();
            await loadCart();
        } catch(error) {
            console.error(error);
            toast.error( error.response?.data?.message || "Failed to increase quantity");
        }
    };

    const handleDecrease = async (cartItemId) => {
        try {
            await decreaseQuantity(cartItemId);

            await loadCartPage();
            await loadCart();
        } catch(error) {
            console.error(error);

            toast.error( error.response?.data?.message || "Failed to decrease quantity");
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

    if(loading) return <Loader />;

    if (!cart || cart.items.length === 0) {
        return (
            <PageWrapper title="Cart">
                <EmptyState
                    icon={<FaShoppingCart />}
                    title="Your cart is empty"
                    message="Start shopping and add products to your cart."
                />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title="Cart" >
            <div className="cart-container">

                {cart.items.map(cartItem => (
                    <CartCard key={cartItem.cartItemId}
                                cartItem={cartItem}
                                onIncrease={handleIncrease}
                                onDecrease={handleDecrease} 
                    />
                ))}

                <h2 className="cart-total" >Total: ₹{cart.totalAmount}</h2>

                <div className="cart-footer">
                    <button onClick={handleClearCart} className="clear-cart-btn">
                        Clear Cart
                    </button>

                    <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                        Proceed to checkout
                    </button>
                </div>
            </div>
        </PageWrapper>
    );
}

export default Cart;