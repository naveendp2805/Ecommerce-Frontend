import "./OrderCard.css";

function OrderCard({ order }) {

    return (
        <div
            key={order.orderId}
            className="order-card"
        >

            <h3>Order #{order.orderId}</h3>

            <p>Status: {order.orderStatus}</p>

            <p>Date: {order.orderDate}</p>

            <h4>Items</h4>

            {order.items.map(item => (

                <div key={item.productId} style={{marginLeft: "20px"}} >
                    <p>
                        {item.productName}
                    </p>

                    <p>
                        Qty: {item.quantity}
                    </p>

                    <p>
                        Price: ₹{item.price}
                    </p>

                    <p>
                        Subtotal: ₹{item.subTotal}
                    </p>

                    <hr />
                </div>

            ))}

            <h3>Total: ₹{order.totalAmount}</h3>

        </div>
    );
}

export default OrderCard;