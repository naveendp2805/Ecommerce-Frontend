import { useContext, useState } from "react";
import { register, login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginAndRegister.css";
import { toast } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(formData.password !== formData.confirmPassword) {
            toast.error("Password do not match");

            return;
        }

        try {

            setLoading(true);

            await register({name: formData.name, email: formData.email, password: formData.password, phoneNumber: formData.phoneNumber});

            const loginResponse = await login(formData.email, formData.password);

            localStorage.setItem("accessToken", loginResponse.accessToken);
            localStorage.setItem("refreshToken", loginResponse.refreshToken);

            setIsAuthenticated(true);

            toast.success("Registration Successful");

            navigate("/products");

        } catch(error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="auth-container">
            <div className="auth-card">

                <h1>Register</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <br />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <br />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    <br />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <br />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={
                            formData.confirmPassword
                        }
                        onChange={handleChange}
                        required
                    />

                    <br />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Registering..."
                                : "Register"
                        }
                    </button>

                </form>

                <p>
                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;