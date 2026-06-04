import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";
import "./ProductDetails.css";
import PageWrapper from "../layouts/PageWrapper";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        loadProduct();
    }, [id]);

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

    if(!product)
        return <h2>Loading...</h2>;

    return (
        <PageWrapper title="Product Details">
            <div className="product-details">

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-details-image"
                />

                <div className="product-details-content">

                    <h2>{product.name}</h2>

                    <p>{product.description}</p>

                    <p>
                        Category:
                        {product.category?.name}
                    </p>

                    <h3 className="product-price">
                        ₹{product.price}
                    </h3>

                    <p>
                        Stock:
                        {product.stockQuantity}
                    </p>

                    <button
                        onClick={handleAddToCart}
                    >
                        Add To Cart
                    </button>

                </div>

            </div>
        </PageWrapper>
    );
}

export default ProductDetails;