import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;