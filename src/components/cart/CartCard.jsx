import "./CartCard.css";

function CartCard({ cartItem }) {
    return (
        <div className="cart-card" >
            <h3>{cartItem.productName}</h3>
            <p>Price: ₹{cartItem.price}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <p>Sub Total: ₹{cartItem.subTotal}</p>
        </div>
    );
}

export default CartCard;