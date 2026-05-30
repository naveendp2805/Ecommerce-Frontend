import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard.jsx";
import "./Products.css";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Products</h1>

            <div className="products-grid">
                {products.map(product => (
                <ProductCard key={product.id} product={product} />  

                ))}
            </div>
        </div>
    );
}

export default Products;