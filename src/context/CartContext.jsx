import { createContext, useEffect, useState } from "react";
import { getCart } from "../services/cartService";

export const CartContext = createContext();

function CartProvider({ children }) {

    const [cart, setCart] = useState(null);

    const [cartCount, setCartCount] = useState(0);

    const loadCart = async () => {

        const token = localStorage.getItem("accessToken");

        if(!token) return;
        
        try {
            const data = await getCart();

            setCart(data);

            setCartCount(data.items.reduce((total, item) => total + item.quantity, 0));
            
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                cartCount,
                setCartCount,
                loadCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;