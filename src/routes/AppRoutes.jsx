import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";

function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
        </Routes>
    );
}

export default AppRoutes;