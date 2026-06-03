import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Order from "../pages/Order";
import PaymentSuccess from "../pages/PaymentSuccess";

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
            <Route path="/cart" element={
                <ProtectedRoute>
                    <Cart />
                </ProtectedRoute>
                }
             />
            <Route path="/checkout" element={
                <ProtectedRoute>
                    <Checkout />
                </ProtectedRoute>
            }
            />
            <Route path="/orders" element={
                <ProtectedRoute>
                    <Order />
                </ProtectedRoute>
            }
            />
            <Route path="/payment-success" element={
                <ProtectedRoute>
                    <PaymentSuccess />
                </ProtectedRoute>
            } 
            />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRoutes;