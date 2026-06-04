import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import OrderCard from "../components/order/OrderCard";
import "./Order.css";
import PageWrapper from "../layouts/PageWrapper";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import { FaBox } from "react-icons/fa";

function Order() {

    const [orders, setOrders] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, [page]);

    const loadOrders = async (page=0, size=5, sortBy="orderDate") => {
        try {
            const data = await getMyOrders(page, size, sortBy);

            setOrders(data.content);

            setTotalPages(data.totalPages);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if(loading) return <Loader />;

    if(orders.length === 0) 
        return (
        <PageWrapper title="Cart">
            <EmptyState
                icon={<FaBox />}
                title="No Orders Yet"
                message="Place your first order to see it here."
            />
        </PageWrapper>
    );

    return (
        <PageWrapper title="My Orders" >
            <div className="orders-container">

                <div className="orders-grid" >
                    {orders.map(order => (
                        <OrderCard className="order-card" key={order.orderId} order={order} />
                    ))}
                </div>

                <div>

                    <button
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span>
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        disabled={page + 1 >= totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>
        </PageWrapper>
    );
}

export default Order;