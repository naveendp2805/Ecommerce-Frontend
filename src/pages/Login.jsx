import { useState, useContext } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
    
    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await login(email, password);

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            setIsAuthenticated(true);

            navigate("/products");

            console.log(data);
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div>

            <h1>Login</h1>

            <input type="email" 
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
            />

            <input type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    );
} 

export default Login;