import { useEffect, useState } from "react";
import { getProductsByPage, getProductsByCategory } from "../services/productService";
import ProductCard from "../components/product/ProductCard.jsx";
import ProductFilters from "../components/product/ProductFilters.jsx";
import "./Products.css";
import { getAllCategories } from "../services/categoryService.jsx";
import { addToCart } from "../services/cartService.jsx";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import PageWrapper from "../layouts/PageWrapper";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";

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

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, [page, selectedCategory, sortBy, direction]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadProducts = async () => {

        setLoading(true);
        
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
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {

        setLoading(true);

        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId, 1);

            await loadCart();

            toast.success("Added To Cart");
        } catch(error) {
            console.error(error);
            toast.error("Failed to add Product");
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if(loading) return <Loader />;

    return (
        <PageWrapper title="Products">
            <div>

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
        </PageWrapper>
    );
}

export default Products;