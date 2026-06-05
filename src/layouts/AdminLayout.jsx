import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";
import "./AdminLayout.css";

function AdminLayout() {

    return (
        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">
                <Outlet />
            </div>

        </div>
    );
}

export default AdminLayout;