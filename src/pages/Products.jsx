import { useEffect, useState } from "react";
import { getAllProducts, getProductsByPage, getProductsByCategory } from "../services/productService";
import ProductCard from "../components/product/ProductCard.jsx";
import "./Products.css";
import { getAllCategories } from "../services/categoryService.jsx";

function Products() {

    const [searchTerm, setSearchTerm] = useState("");

    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");

    const [sortBy, setSortBy] = useState("id");

    const [direction, setDirection] = useState("asc")

    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, [page, selectedCategory, sortBy, direction]);

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

            <select  
                onChange={(e) => {
                    const value = e.target.value;

                    if(value === "idAsc") {
                        setSortBy("id");
                        setDirection("asc")
                    }

                    if(value === "idDesc") {
                        setSortBy("id");
                        setDirection("desc")
                    }

                    if(value === "priceAsc") {
                        setSortBy("price");
                        setDirection("asc");
                    }

                    if(value === "priceDesc") {
                        setSortBy("price");
                        setDirection("desc");
                    }

                    if(value === "nameAsc") {
                        setSortBy("name");
                        setDirection("asc");
                    }

                    if(value === "nameDesc") {
                        setSortBy("name");
                        setDirection("desc");
                    }

                    setPage(0);
                }}
            >

                <option value="idAsc" >
                    Newest First
                </option>

                <option value="idDesc" >
                    Oldest First
                </option>

                <option value="priceAsc" >
                    Price Low → High
                </option>

                <option value="priceDesc" >
                    Price High → Low
                </option>

                <option value="nameAsc">
                    Name A → Z
                </option>

                <option value="nameDesc">
                    Name Z → A
                </option>

            </select>

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