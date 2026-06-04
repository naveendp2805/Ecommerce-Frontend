import "./AdminDashboard.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import StatCard from "../../components/admin/StatCard";

function AdminDashboard() {

    return (
        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <h1>Dashboard</h1>

                <div className="stats-grid">

                    <StatCard
                        title="Products"
                        value="25"
                    />

                    <StatCard
                        title="Categories"
                        value="8"
                    />

                    <StatCard
                        title="Orders"
                        value="56"
                    />

                    <StatCard
                        title="Users"
                        value="120"
                    />

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;