import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const userInfo = localStorage.getItem("user-blog");
    const [user, setUser] = useState(userInfo);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("userInfo");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};
