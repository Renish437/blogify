import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Blog from "./components/pages/Blog";
import Detail from "./components/pages/Detail";
import Profile from "./components/account/Profile";
import MyBlogs from "./components/account/MyBlogs";
import ChangePasword from "./components/account/ChangePasword";
import FavBlog from "./components/account/FavBlog";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/my-blogs" element={<MyBlogs />} />
                <Route path="/change-password" element={<ChangePasword />} />
                <Route path="/saved-blogs" element={<FavBlog />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
