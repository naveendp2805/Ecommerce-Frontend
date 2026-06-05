import { useEffect, useState } from "react";
import { getProductsByPage, addProduct, updateProduct, deleteProduct } from "../../services/productService";
import { getAllCategories } from "../../services/categoryService";
import "./AdminProducts.css";
import { toast } from "react-toastify";

function AdminProducts() {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: ""
    });

    const [image, setImage] = useState(null);

    const [editingProductId, setEditingProductId] = useState(null);

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);


    const loadCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch(error) {
            console.error(error);
        }
    };

    const loadProducts = async () => {
        try {
            const data = await getProductsByPage(0, 100, "id", "asc");

            setProducts(data.content);
        } catch(error) {
            console.error(error);
        }
    };

    const handleSaveProduct = async () => {
        try {
            const formData = new FormData();

            formData.append("name", productForm.name);
            formData.append("description", productForm.description);
            formData.append("price", productForm.price);
            formData.append("stockQuantity", productForm.stockQuantity);
            formData.append("categoryId", productForm.categoryId);

            if (image) {
                formData.append("image", image);
            }

            if (editingProductId) {

                await updateProduct(
                    editingProductId,
                    formData
                );

                toast.success(
                    "Product updated successfully"
                );

            } else {

                if (!image) {
                    toast.error(
                        "Please select a product image"
                    );
                    return;
                }

                await addProduct(formData);

                toast.success(
                    "Product created successfully"
                );
            }

            setProductForm({
                name: "",
                description: "",
                price: "",
                stockQuantity: "",
                categoryId: ""
            });

            setImage(null);

            setEditingProductId(null);

            setShowForm(false);

            await loadProducts();

        } catch(error) {

            console.error(error);

            toast.error(
                "Failed to save product"
            );
        }
    };

    const handleEditProduct = (product) => {

        setEditingProductId(product.id);

        setProductForm({
            name: product.name,
            description: product.description,
            price: product.price,
            stockQuantity: product.stockQuantity,
            categoryId: product.category?.id || ""
        });

        setImage(null);

        setShowForm(true);
    };

    const handleDeleteProduct = async (productId) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");

        if(!confirm) return;

        try {
            await deleteProduct(productId);

            toast.success("product deleted succesfully");

            await loadProducts();
        } catch(error) {
            console.error(error);

            toast.error("Failed to delete Product");
        }
    };

    return (
        <div className="admin-products">

            <h1>Manage Products</h1>

            <button className="add-product-btn"
                    onClick={() => {
                        setEditingProductId(null);

                        setProductForm({
                            name: "",
                            description: "",
                            price: "",
                            stockQuantity: "",
                            categoryId: ""
                        });

                        setImage(null);

                        setShowForm(true);
                    }}
            >
                + Add Product
            </button>

            {showForm && (
                <div className="modal-overlay">

                    <div className="product-modal">

                        <div className="modal-header">
                            <h2>
                                {editingProductId
                                    ? "Edit Product"
                                    : "Add Product"}
                            </h2>

                            <button
                                className="close-btn"
                                onClick={() => setShowForm(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <input
                            placeholder="Product Name"
                            value={productForm.name}
                            onChange={(e) =>
                                setProductForm({
                                    ...productForm,
                                    name: e.target.value
                                })
                            }
                        />

                        <textarea
                            placeholder="Description"
                            value={productForm.description}
                            onChange={(e) =>
                                setProductForm({
                                    ...productForm,
                                    description: e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={productForm.price}
                            onChange={(e) =>
                                setProductForm({
                                    ...productForm,
                                    price: e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Stock Quantity"
                            value={productForm.stockQuantity}
                            onChange={(e) =>
                                setProductForm({
                                    ...productForm,
                                    stockQuantity: e.target.value
                                })
                            }
                        />

                        <select
                            value={productForm.categoryId}
                            onChange={(e) =>
                                setProductForm({
                                    ...productForm,
                                    categoryId: e.target.value
                                })
                            }
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}

                        </select>

                        <div className="image-upload-group">
                            <label>Product Image</label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />

                            {image && (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="image-preview"
                                />
                            )}
                        </div>

                        <div className="form-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="save-btn"
                                onClick={handleSaveProduct}
                            >
                                {editingProductId
                                    ? "Update Product"
                                    : "Save Product"}
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <table className="admin-table">

                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {products.map(product => (
                        <tr key={product.id}>

                            <td>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width="60"
                                />
                            </td>

                            <td>{product.name}</td>

                            <td>{product.category?.name}</td>

                            <td>
                                ₹{product.price}
                            </td>

                            <td>
                                {product.stockQuantity}
                            </td>

                            <td>
                                <button className="edit-btn"
                                        onClick={() => handleEditProduct(product)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteProduct(product.id)}
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default AdminProducts;