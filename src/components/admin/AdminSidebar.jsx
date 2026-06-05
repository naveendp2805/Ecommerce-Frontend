import { Link } from "react-router-dom";
import {FaTachometerAlt, FaBoxOpen, FaTags, FaClipboardList, FaUsers} from "react-icons/fa";
import "./AdminSidebar.css";

function AdminSidebar() {
    return (
        <div className="admin-sidebar">

            <h2>Admin</h2>

            <Link to="/admin">
                <FaTachometerAlt />
                Dashboard
            </Link>

            <Link to="/admin/products">
                <FaBoxOpen />
                Products
            </Link>

            <Link to="/admin/categories">
                <FaTags />
                Categories
            </Link>

            <Link to="/admin/orders">
                <FaClipboardList />
                Orders
            </Link>

            <Link to="/admin/users">
                <FaUsers />
                Users
            </Link>

        </div>
    );
}

export default AdminSidebar;