import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={
                <ProtectedRoute>
                    <Products />
                </ProtectedRoute>
                } 
            />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRoutes;