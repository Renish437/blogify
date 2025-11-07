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
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/common/RequireAuth";
import GuestRoute from "./components/common/GuestRoute";
import CreateBlog from "./components/blog/CreateBlog";
import UpdateBlog from "./components/blog/UpdateBlog";
// import { Toaster } from 'react-hot-toast';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                } />
                <Route path="/register" element={
                    <GuestRoute>
                        <Register />
                    </GuestRoute>
                } />
               
                <Route path="/blogs" element={<Blog />} />
                <Route path="/detail" element={<Detail />} />

                 <Route path="/profile" element={
                    <RequireAuth>
                        <Profile />
                    </RequireAuth>
                 } />
                   <Route path="/blogs/create" element={
                    <RequireAuth>
                        <CreateBlog />
                    </RequireAuth>
                 } />
                 <Route path="/blogs/:id/edit" element={
                    <RequireAuth>
                        <UpdateBlog />
                    </RequireAuth>
                 } />
                <Route path="/my-blogs" element={
                    <RequireAuth>
                        <MyBlogs />
                    </RequireAuth>
                 } />
                <Route path="/change-password" element={
                    <RequireAuth>
                        <ChangePasword />
                    </RequireAuth>
                 } />
                <Route path="/saved-blogs" element={
                    <RequireAuth>
                        <FavBlog />
                    </RequireAuth>
                 }/>
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
};

export default App;
