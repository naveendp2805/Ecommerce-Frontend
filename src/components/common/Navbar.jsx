import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav >
            <Link to="/" style={{textDecoration: "none", color: "inherit"}} >Home</Link>{" | "}
            <Link to="/products" style={{textDecoration: "none", color: "inherit"}} >Products</Link>{" | "}
            <Link to="/cart" style={{textDecoration: "none", color: "inherit"}} >Cart</Link>{" | "}
            <Link to="/login" style={{textDecoration: "none", color: "inherit"}} >Login</Link>{" | "}
        </nav>
    );
}

export default Navbar;