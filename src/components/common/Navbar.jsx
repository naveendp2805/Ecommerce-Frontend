import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/AuthUtils";
import { CartContext } from "../../context/CartContext";
import "./Navbar.css"
import { FaHome, FaBoxOpen, FaShoppingCart, FaClipboardList, FaUser, FaSignInAlt } from "react-icons/fa";

function Navbar() {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const navigate = useNavigate();

    const { cartCount } = useContext(CartContext)

    return (
        <nav className="navbar">
            <Link to="/" style={{textDecoration: "none", color: "inherit"}} >
                <FaHome />
                <span>Home</span>
            </Link>

            <Link to="/products" style={{textDecoration: "none", color: "inherit"}} >
                <FaBoxOpen />
                <span>Products</span>
            </Link>

            {isAuthenticated && (
                <>
                    <Link to="/cart" style={{textDecoration: "none", color: "inherit"}} >
                        <FaShoppingCart />
                        <span>Cart ({cartCount})</span>
                    </Link>
                </>
            )}

            <Link to="/orders" style={{textDecoration: "none", color: "inherit"}} >
                <FaClipboardList />
                <span>Orders</span>
            </Link>

            <Link to="/profile" style={{textDecoration: "none", color: "inherit"}} >
                <FaUser />
                <span>Profile</span>
            </Link>
            
            {!isAuthenticated && (
                <>
                    <Link to="/login" style={{textDecoration: "none", color: "inherit"}} >
                        <FaSignInAlt />
                        <span>SignIn</span>
                    </Link>
                
                </>
            )}
        </nav>
    );
}

export default Navbar;