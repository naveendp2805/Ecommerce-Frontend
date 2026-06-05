import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/orderService";
import { toast } from "react-toastify";
import "./AdminOrders.css";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        loadOrders();
    }, [page]);

    const loadOrders = async () => {
        try {

            const data = await getMyOrders(page, 10, "orderDate");

            setOrders(data.content);
            setTotalPages(data.totalPages);

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to load orders"
            );
        }
    };

    return (
        <div className="admin-orders">

            <h1>Manage Orders</h1>

            <table className="admin-table">

                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {orders.map(order => (

                        <tr key={order.orderId}>

                            <td>
                                #{order.orderId}
                            </td>

                            <td>
                                {order.customerName}
                            </td>

                            <td>
                                {order.customerEmail}
                            </td>

                            <td>
                                ₹{order.totalAmount}
                            </td>

                            <td>
                                <span
                                    className={`status-badge ${order.orderStatus.toLowerCase()}`}
                                >
                                    {order.orderStatus}
                                </span>
                            </td>

                            <td>
                                {new Date(
                                    order.orderDate
                                ).toLocaleDateString()}
                            </td>

                            <td>

                                <button
                                    className="view-btn"
                                    onClick={() =>
                                        setSelectedOrder(order)
                                    }
                                >
                                    View
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="pagination">

                <button
                    disabled={page === 0}
                    onClick={() =>
                        setPage(page - 1)
                    }
                >
                    Previous
                </button>

                <span>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    disabled={
                        page + 1 >= totalPages
                    }
                    onClick={() =>
                        setPage(page + 1)
                    }
                >
                    Next
                </button>

            </div>

            {selectedOrder && (

                <div className="modal-overlay">

                    <div className="order-modal">

                        <div className="modal-header">

                            <h2>
                                Order #
                                {selectedOrder.orderId}
                            </h2>

                            <button
                                className="close-btn"
                                onClick={() =>
                                    setSelectedOrder(null)
                                }
                            >
                                ✕
                            </button>

                        </div>

                        <div className="order-info">

                            <p>
                                <strong>
                                    Customer:
                                </strong>{" "}
                                {selectedOrder.customerName}
                            </p>

                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {selectedOrder.customerEmail}
                            </p>

                            <p>
                                <strong>
                                    Status:
                                </strong>{" "}
                                {selectedOrder.orderStatus}
                            </p>

                            <p>
                                <strong>
                                    Total:
                                </strong>{" "}
                                ₹
                                {selectedOrder.totalAmount}
                            </p>

                        </div>

                        <h3>
                            Ordered Products
                        </h3>

                        <table className="items-table">

                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>

                                {selectedOrder.items.map(item => (

                                    <tr
                                        key={
                                            item.productId
                                        }
                                    >
                                        <td>
                                            {item.productName}
                                        </td>

                                        <td>
                                            {item.quantity}
                                        </td>

                                        <td>
                                            ₹{item.price}
                                        </td>

                                        <td>
                                            ₹
                                            {item.subTotal}
                                        </td>
                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>
    );
}

export default AdminOrders;