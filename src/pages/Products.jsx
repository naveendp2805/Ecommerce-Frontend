import { useEffect, useState } from "react";
import { getAllProducts, getProductsByPage, getProductsByCategory } from "../services/productService";
import ProductCard from "../components/product/ProductCard.jsx";
import "./Products.css";
import { getAllCategories } from "../services/categoryService.jsx";

function Products() {

    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, [page, selectedCategory]);

    const loadProducts = async () => {
        try {
            if(selectedCategory) {
                const data = await getProductsByCategory(selectedCategory);
                setProducts(data);

                return;
            }

            const data = await getProductsByPage(page);
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

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Products</h1>

            <input type="text" 
                    placeholder="Search Products" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
            />

            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >
                <option value="" >
                    All Categories
                </option>

                {categories.map(category => (
                    <option key={category.id} value={category.id} >
                        {category.name}
                    </option>
                ))}
            </select>

            <p>Selected Category: {selectedCategory}</p>

            <div className="products-grid">
                {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />  
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