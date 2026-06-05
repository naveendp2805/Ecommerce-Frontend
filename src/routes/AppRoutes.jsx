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
import UserProfile from "../pages/UserProfile";
import Register from "../pages/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRoute from "../components/auth/AdminRoute";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminLayout from "../layouts/AdminLayout";

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
            <Route path="/profile" element={
                <ProtectedRoute>
                    <UserProfile />
                </ProtectedRoute>
            } 
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/*Admin Routes*/}

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >

                <Route
                    index
                    element={<AdminDashboard />}
                />

                <Route
                    path="products"
                    element={<AdminProducts />}
                />

                <Route
                    path="categories"
                    element={<AdminCategories />}
                />

                <Route
                    path="orders"
                    element={<AdminOrders />}
                />

                <Route
                    path="users"
                    element={<AdminUsers />}
                />

            </Route>
        </Routes>
    );
}

export default AppRoutes;