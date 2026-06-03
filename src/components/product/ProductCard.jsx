import { Link } from "react-router-dom";
import "./ProductCard.css"

function ProductCard({product, onAddToCart}) {

    const imageUrl = product.imageUrl;

    return (
        
        <div className="product-card" >

            <Link to={`/products/${product.id}`} 
                    style={{textDecoration: "none", color: "inherit"}} >
                <img src={imageUrl} alt={product.name} className="product-image" />

                <h2>Name: {product.name}</h2>

            </Link>
            
            <p>Description: {product.description}</p>

            <p>Category: {product.category?.name}</p>

            <p className="price" >Price: ₹{product.price}</p>

            <p>Stock: {product.stockQuantity}</p>

            <button disabled={product.stockQuantity === 0}
                    onClick={() => onAddToCart(product.id)} >
                {product.stockQuantity > 0
                    ? "Add To Cart"
                    : "Out of Stock"}
            </button>
        </div>
    );
}

export default ProductCard;