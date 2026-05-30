import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import ProductCard from "../components/product/ProductCard";

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
    
    if(!product) return <h2>Loading.....</h2>

    return (
        <div>
            <h1>Product Details</h1>
            
            <ProductCard key={product.id} product={product} />
        </div>
    );
}

export default ProductDetails;