import { Link } from "react-router-dom";
import "./ProductCard.css"

function ProductCard({product}) {

    const imageUrl = import.meta.env.VITE_API_BASE_URL + product.imageUrl;

    return (
        <Link to={`/products/${product.id}`} 
              style={{textDecoration: "none", color: "inherit"}} >
            <div className="product-card" >

                <img src={imageUrl} alt={product.name} className="product-image" />

                <h2>Name: {product.name}</h2>

                <p>Description: {product.description}</p>

                <p>Category: {product.category?.name}</p>

                <p className="price" >Price: ₹{product.price}</p>

                <p>Stock: {product.stockQuantity}</p>
            </div>
        </Link>
    );
}

export default ProductCard;