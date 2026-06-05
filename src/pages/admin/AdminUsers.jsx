import { useEffect, useState } from "react";
import {getUsers, updateUser, deleteUser} from "../../services/userService";
import { toast } from "react-toastify";
import "./AdminUsers.css";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingUser, setEditingUser] = useState(null);

    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        role: "USER"
    });

    useEffect(() => {
        loadUsers();
    }, [page]);

    const loadUsers = async () => {

        try {

            const data = await getUsers(page, 10);

            setUsers(data.content);

            setTotalPages(data.totalPages);

        } catch(error) {

            console.error(error);

            toast.error("Failed to load users");
        }
    };

    const handleEditUser = (user) => {

        setEditingUser(user);

        setUserForm({
            name: user.name,
            email: user.email,
            role: user.role
        });

        setShowModal(true);
    };

    const handleSaveUser = async () => {

        try {

            await updateUser(
                editingUser.id,
                userForm
            );

            toast.success(
                "User updated successfully"
            );

            setShowModal(false);

            setEditingUser(null);

            await loadUsers();

        } catch(error) {

            console.error(error);

            toast.error(
                "Failed to update user"
            );
        }
    };

    const handleDeleteUser = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if(!confirmed) return;

        try {

            await deleteUser(id);

            toast.success(
                "User deleted successfully"
            );

            await loadUsers();

        } catch(error) {

            console.error(error);

            toast.error(
                "Failed to delete user"
            );
        }
    };

    const filteredUsers = users.filter(user =>
        user.name
            .toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            )
    );

    return (
        <div className="admin-users">

            <h1>Manage Users</h1>

            <input
                className="search-input"
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
            />

            <table className="admin-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {filteredUsers.map(user => (

                        <tr key={user.id}>

                            <td>
                                {user.id}
                            </td>

                            <td>
                                {user.name}
                            </td>

                            <td>
                                {user.email}
                            </td>

                            <td>
                                <span
                                    className={`role-badge ${user.role.toLowerCase()}`}
                                >
                                    {user.role}
                                </span>
                            </td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        handleEditUser(user)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDeleteUser(user.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="pagination">

                <button
                    disabled={page === 0}
                    onClick={() =>
                        setPage(page - 1)
                    }
                >
                    Previous
                </button>

                <span>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    disabled={
                        page + 1 >= totalPages
                    }
                    onClick={() =>
                        setPage(page + 1)
                    }
                >
                    Next
                </button>

            </div>

            {showModal && (

                <div className="modal-overlay">

                    <div className="user-modal">

                        <div className="modal-header">

                            <h2>Edit User</h2>

                            <button
                                className="close-btn"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                ✕
                            </button>

                        </div>

                        <input
                            type="text"
                            value={userForm.name}
                            onChange={(e) =>
                                setUserForm({
                                    ...userForm,
                                    name: e.target.value
                                })
                            }
                        />

                        <input
                            type="email"
                            value={userForm.email}
                            onChange={(e) =>
                                setUserForm({
                                    ...userForm,
                                    email: e.target.value
                                })
                            }
                        />

                        <select
                            value={userForm.role}
                            onChange={(e) =>
                                setUserForm({
                                    ...userForm,
                                    role: e.target.value
                                })
                            }
                        >
                            <option value="USER">
                                USER
                            </option>

                            <option value="ADMIN">
                                ADMIN
                            </option>
                        </select>

                        <div className="form-actions">

                            <button
                                className="cancel-btn"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="save-btn"
                                onClick={handleSaveUser}
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default AdminUsers;