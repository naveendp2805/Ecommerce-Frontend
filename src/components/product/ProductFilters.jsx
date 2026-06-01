import "../../pages/Products.css"

function ProductFilters({searchTerm, setSearchTerm, categories, selectedCategory, setSelectedCategory, setPage, setSortBy, setDirection}) {

    return (
        <div className="filter-bar" >

            <input type="text" 
                    placeholder="Search Products" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
            />

            <select value={selectedCategory} onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(0);
            }} >
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

        </div>
    );
}

export default ProductFilters;