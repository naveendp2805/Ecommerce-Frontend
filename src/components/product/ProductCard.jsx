import { Link } from "react-router-dom";
import "./ProductCard.css"

function ProductCard({product, onAddToCart}) {

    const imageUrl = product.imageUrl;

    return (
        
        <div className="product-card">
            <Link
                to={`/products/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="product-image"
                />
            </Link>

            <div className="product-info">

                <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <h2>{product.name}</h2>
                </Link>

                <p>{product.description}</p>

                <p>Category: {product.category?.name}</p>

                <p>Stock: {product.stockQuantity}</p>

                <p className="price">
                    ₹{product.price}
                </p>

                <button
                    disabled={product.stockQuantity === 0}
                    onClick={() => onAddToCart(product.id)}
                >
                    {product.stockQuantity > 0
                        ? "Add To Cart"
                        : "Out of Stock"}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;