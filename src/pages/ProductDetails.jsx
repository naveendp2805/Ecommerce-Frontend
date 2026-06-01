import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import ProductCard from "../components/product/ProductCard";
import { addToCart } from "../services/cartService";

function ProductDetails() {

    const {id} = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try {
            const data = await getProductById(id);
            setProduct(data);
        } catch(error) {
            console.error(error);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(product.id, 1);
            alert("Product added to Cart");
        } catch(error) {
            console.error(error);
            alert("Failed to add Product");
        }
    };
    
    if(!product) return <h2>Loading.....</h2>

    return (
        <div>
            <h1>Product Details</h1>
            
            <ProductCard key={product.id} product={product} />

            <button onClick={handleAddToCart} >
                Add to Cart
            </button>
        </div>
    );
}

export default ProductDetails;