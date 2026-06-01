import { logout } from "../services/authService";

export const handleLogout = async (setIsAuthenticated, navigate) => {

    try {

        await logout();

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setIsAuthenticated(false);

        navigate("/login");
    } catch(error) {
        console.error(error);
    }
};