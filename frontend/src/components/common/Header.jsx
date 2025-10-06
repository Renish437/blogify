import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { token } from "./Config";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm font-dm-sans">
                <div className="container max-w-[1440px] mx-auto flex items-center justify-between px-4 py-4">
                    <Link to="/" className="text-xl font-bold ">
                        Blogify
                    </Link>

                    <nav className="hidden md:flex space-x-6">
                        <NavLink
                            to="/blogs"
                            className="text-gray-900 hover:text-gray-600"
                        >
                            Fashion
                        </NavLink>

                        <NavLink
                            to="/blogs"
                            className="text-gray-900 hover:text-gray-600"
                        >
                            Travel
                        </NavLink>

                        <NavLink
                            to="/blogs"
                            className="text-gray-900 hover:text-gray-600"
                        >
                            Education
                        </NavLink>

                        <NavLink
                            to="/blogs"
                            className="text-gray-900 hover:text-gray-600"
                        >
                            Technology
                        </NavLink>

                        <NavLink
                            to="/blogs"
                            className="text-gray-900 hover:text-gray-600"
                        >
                            Business
                        </NavLink>

                        <NavLink
                            to="/blogs"
                            className="text-gray-900 hover:text-gray-600"
                        >
                            Entertainment
                        </NavLink>
                    </nav>

                    <div className="hidden md:flex space-x-4">
                        <Link
                            to="/login"
                            className="px-4 py-2 border border-primary-color text-primary-color rounded-md hover:bg-primary-color hover:text-white transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 bg-primary-color hover:bg-secondary-color text-white rounded-md transition"
                        >
                            Register
                        </Link>
                    </div>

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
                        <NavLink
                            to="/blogs"
                            className="block text-gray-900 hover:text-gray-600 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Fashion
                        </NavLink>
                        <NavLink
                            to="/blogs"
                            className="block text-gray-900 hover:text-gray-600 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Travel
                        </NavLink>
                        <NavLink
                            to="/blogs"
                            className="block text-gray-900 hover:text-gray-600 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Education
                        </NavLink>
                        <NavLink
                            to="/blogs"
                            className="block text-gray-900 hover:text-gray-600 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Technology
                        </NavLink>
                        <NavLink
                            to="/blogs"
                            className="block text-gray-900 hover:text-gray-600 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Business
                        </NavLink>
                        <NavLink
                            to="/blogs"
                            className="block text-gray-900 hover:text-gray-600 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Entertainment
                        </NavLink>
                    </nav>
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
                </div>
            </div>
        </>
    );
};

export default Header;
