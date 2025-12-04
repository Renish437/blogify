import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { token } from "./Config";
import { AuthContext } from "../context/Auth";
import instance from "./axiosConfig";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const isLoginIn = isLoggedIn();
   const [latestBlogs, setLatestBlogs] = useState([]);
   const [searchParams,setSearchParams] = useSearchParams();
    const categories = [
        { name: 'All' },
        { name: 'Design' },
        { name: 'Development' },
        { name: 'Technology' },
        { name: 'News' },
        { name: 'Education' },
        { name: 'Others' },
    
    ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
            let url = "/blogs/get-blogs";
            if (searchParams.get("category")) {
                url += "?category=" + searchParams.get("category");
            }
            const { data, message, success } = await instance.get(url);
            if (success) {
                setLatestBlogs(data?.blogs || []);
            } else {
                console.log(message || "Failed to fetch blogs");
            }
        } catch (error) {
            console.log(error?.message || "Something went wrong");
        }
    };

    fetchBlogs();
}, [searchParams]);
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm font-dm-sans">
        <div className="container max-w-[1440px] mx-auto flex items-center justify-between px-4 py-5">
          <Link to="/" className="text-2xl font-bold ">
            Blogify
          </Link>

          <nav className="hidden md:flex space-x-6">
            {
              categories && categories.map((category,index)=>{
                return (
                <NavLink
                key={index}
              to={`/blogs?category=${category.name.toLowerCase()}`}
              className="text-gray-900 hover:text-gray-600  md:text-lg"
            >
             { category.name}
            </NavLink>
                )
              })
            }
         

           
          </nav>
          {!isLoginIn && (
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 border md:text-lg border-primary-color text-primary-color rounded-md hover:bg-primary-color hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 md:text-lg bg-primary-color  text-white rounded-md transition"
              >
                Register
              </Link>
            </div>
          )}
          {isLoginIn && (
            <Link
              to="/profile"
              className="px-4 py-2 md:text-lg hidden md:block bg-primary-color  text-white rounded-md transition"
            >
              Dashboard
            </Link>
          )}

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Mobile menu content */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg px-6 py-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="text-xl font-bold"
              onClick={toggleMobileMenu}
            >
              Blogify
            </Link>
            <button
              className="p-2 text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="space-y-4">
           {
              categories && categories.map((category,index)=>{
                return (
                <NavLink
                key={index}
              to={`/blogs?category=${category.name.toLowerCase()}`}
              className="block text-gray-500 hover:text-gray-600 py-2"
            >
             { category.name}
            </NavLink>
                )
              })
            }
          </nav>
              {!isLoginIn && (

          <div className="mt-8 space-y-4">
            <Link
              to="/login"
              className="block w-full px-4 py-2 text-center border border-primary-color text-primary-color rounded-md hover:bg-primary-color hover:text-white transition"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="block w-full px-4 py-2 text-center bg-primary-color hover:bg-secondary-color text-white rounded-md transition"
              onClick={toggleMobileMenu}
            >
              Register
            </Link>
          </div>
              )}

                {isLoginIn && (
                   <div className="mt-8 space-y-4">
            <Link
              to="/profile"
        className="block w-full px-4 py-2 text-center bg-primary-color hover:bg-secondary-color text-white rounded-md transition"
            >
              Dashboard
            </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
