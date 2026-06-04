import "./CartCard.css";

function CartCard({ cartItem, onIncrease, onDecrease }) {
    return (
        <div className="cart-card" >
            <h3>{cartItem.productName}</h3>
            <p>Price: ₹{cartItem.price}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <p>Sub Total: ₹{cartItem.subTotal}</p>

            <div className="cart-actions">
                <button onClick={() => onDecrease(cartItem.cartItemId)} >
                    -
                </button>

                <span className="quantity">
                    {cartItem.quantity}
                </span>

                <button onClick={() => onIncrease(cartItem.cartItemId)} >
                    +
                </button>
            </div>
        </div>
    );
}

export default CartCard;