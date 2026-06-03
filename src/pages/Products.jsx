import { useEffect, useState } from "react";
import { getProductsByPage, getProductsByCategory } from "../services/productService";
import ProductCard from "../components/product/ProductCard.jsx";
import ProductFilters from "../components/product/ProductFilters.jsx";
import "./Products.css";
import { getAllCategories } from "../services/categoryService.jsx";
import { addToCart } from "../services/cartService.jsx";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Products() {

    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [sortBy, setSortBy] = useState("id");
    const [direction, setDirection] = useState("asc");

    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const { loadCart } = useContext(CartContext);

    useEffect(() => {
        loadProducts();
    }, [page, selectedCategory, sortBy, direction]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadProducts = async () => {
        try {
            if(selectedCategory) {
                const data = await getProductsByCategory(selectedCategory);
                setProducts(data);

                return;
            }

            const data = await getProductsByPage(page, 5, sortBy, direction);
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch(error) {
            console.error(error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId, 1);

            await loadCart();

            alert("Added To Cart");
        } catch(error) {
            console.error(error);
            alert("Failed to add Product");
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Products</h1>

            <ProductFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}

                categories={categories}

                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}

                setPage={setPage}

                setSortBy={setSortBy}
                setDirection={setDirection}
            />

            <div className="products-grid">
                {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />  
                ))}
            </div>

            <div>
                <button disabled={page === 0} onClick={() => setPage(page - 1)} >
                    Previous
                </button>

                <span>
                    Page {page + 1} of {totalPages}
                </span>

                <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)} >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Products;