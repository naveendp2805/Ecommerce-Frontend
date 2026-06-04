import { Link } from "react-router-dom";
import {FaTachometerAlt, FaBoxOpen, FaTags} from "react-icons/fa";

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

        </div>
    );
}

export default AdminSidebar;