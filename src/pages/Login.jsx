import { useState, useContext } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginAndRegister.css";
import { toast } from "react-toastify";

function Login() {
    
    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        try {

            e.preventDefault();

            setLoading(true);

            const data = await login(email, password);

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            setIsAuthenticated(true);

            navigate("/products");

            console.log(data);
        } catch(error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container" >
            <div className="auth-card">

                <h1>Login</h1>

                <form onSubmit={handleLogin} >
                    <input type="email" 
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                    />

                    <br />

                    <input type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                    />

                    <br />

                    <button type="submit" disabled={loading} >
                        {loading ? "Loggin in..." : "Login" }
                    </button>

                </form>

                <p>
                    New User?

                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
} 

export default Login;