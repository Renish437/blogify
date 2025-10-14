import { createContext, useState } from "react";
import { token } from "../common/Config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const userInfo = token();
    const [user, setUser] = useState(userInfo);

    const login = (user) => {
        setUser(user);
    };
    const isLoggedIn = () => !!user;
    const logout = () => {
        localStorage.removeItem("blogifyUserToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logout, login,isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
