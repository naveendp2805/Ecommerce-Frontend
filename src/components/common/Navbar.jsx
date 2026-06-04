import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/AuthUtils";
import { CartContext } from "../../context/CartContext";
import "./Navbar.css"

function Navbar() {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const navigate = useNavigate();

    const { cartCount } = useContext(CartContext)

    return (
        <nav className="navbar">
            <Link to="/" style={{textDecoration: "none", color: "inherit"}} >Home</Link>
            <Link to="/products" style={{textDecoration: "none", color: "inherit"}} >Products</Link>

            {isAuthenticated && (
                <>
                    <Link to="/cart" style={{textDecoration: "none", color: "inherit"}} >Cart ({cartCount})</Link>
                </>
            )}

            <Link to="/orders" style={{textDecoration: "none", color: "inherit"}} >Orders</Link>

            <Link to="/profile" style={{textDecoration: "none", color: "inherit"}} >Profile</Link>
            
            {!isAuthenticated ? (
                <>
                    <Link to="/login" style={{textDecoration: "none", color: "inherit"}} >Login</Link>
                
                    <Link to="/register" style={{textDecoration: "none", color: "inherit"}} >Register</Link>  
                </>
            ) : (
                <button onClick={() => handleLogout(setIsAuthenticated, navigate)}>
                    Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;