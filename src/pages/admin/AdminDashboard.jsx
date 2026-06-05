import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminService";

import AdminSidebar from "../../components/admin/AdminSidebar";
import StatCard from "../../components/admin/StatCard";

import "./AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        orders: 0,
        users: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className="admin-layout">

            <div className="admin-content">

                <div className="dashboard-header">

                    <h1>Admin Dashboard</h1>

                    <p>
                        Overview of your ecommerce platform
                    </p>

                </div>

                <div className="stats-grid">

                    <StatCard
                        title="Products"
                        value={stats.products}
                    />

                    <StatCard
                        title="Categories"
                        value={stats.categories}
                    />

                    <StatCard
                        title="Orders"
                        value={stats.orders}
                    />

                    <StatCard
                        title="Users"
                        value={stats.users}
                    />

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;