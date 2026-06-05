import { useEffect, useState } from "react";
import { getAllCategories, addCategory, updateCategory, deleteCategory} from "../../services/categoryService";
import { toast } from "react-toastify";
import "./AdminCategories.css";

function AdminCategories() {

    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load categories");
        }
    };

    const handleSaveCategory = async () => {

        if (!categoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {

            if (editingCategoryId) {

                await updateCategory(
                    editingCategoryId,
                    { name: categoryName }
                );

                toast.success(
                    "Category updated successfully"
                );

            } else {

                await addCategory({
                    name: categoryName
                });

                toast.success(
                    "Category created successfully"
                );
            }

            setCategoryName("");

            setEditingCategoryId(null);

            setShowForm(false);

            await loadCategories();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to save category"
            );
        }
    };

    const handleEditCategory = (category) => {

        setEditingCategoryId(category.id);

        setCategoryName(category.name);

        setShowForm(true);
    };

    const handleDeleteCategory = async (categoryId) => {

        const confirmed = window.confirm(
            `Delete category "${category.name}"?`
        );

        if (!confirmed) return;

        try {

            await deleteCategory(categoryId);

            toast.success(
                "Category deleted successfully"
            );

            await loadCategories();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete category"
            );
        }
    };

    return (
        <div className="admin-categories">

            <h1>Manage Categories</h1>

            {!showForm && (
                <button
                    className="add-category-btn"
                    onClick={() => {

                        setEditingCategoryId(null);

                        setCategoryName("");

                        setShowForm(true);
                    }}
                >
                    + Add Category
                </button>
            )}

            {showForm && (
                <div className="modal-overlay">

                    <div className="product-modal">

                        <div className="modal-header">

                            <h2>
                                {editingCategoryId
                                    ? "Edit Category"
                                    : "Add Category"}
                            </h2>

                            <button
                                className="close-btn"
                                onClick={() => {

                                    setShowForm(false);

                                    setEditingCategoryId(null);

                                    setCategoryName("");
                                }}
                            >
                                ✕
                            </button>

                        </div>

                        <input
                            type="text"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }
                        />

                        <div className="form-actions">

                            <button
                                className="cancel-btn"
                                onClick={() => {

                                    setShowForm(false);

                                    setEditingCategoryId(null);

                                    setCategoryName("");
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="save-btn"
                                onClick={handleSaveCategory}
                            >
                                {editingCategoryId
                                    ? "Update Category"
                                    : "Save Category"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

            <table className="admin-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {categories.length === 0 ? (
                        <tr>
                            <td colSpan="3">
                                No categories found
                            </td>
                        </tr>
                    ) : (
                        categories.map(category => (
                            <tr key={category.id}>

                                <td>{category.id}</td>

                                <td>{category.name}</td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            handleEditCategory(category)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDeleteCategory(category.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))
                    )}
                    

                </tbody>

            </table>

        </div>
    );
}

export default AdminCategories;