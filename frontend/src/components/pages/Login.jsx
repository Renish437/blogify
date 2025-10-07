import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-9">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-600 mb-2"
                            htmlFor=""
                        >
                            Email
                        </label>
                        <input
                            placeholder="Enter Email"
                            type="text"
                            className={`focus:outline-none w-full border focus:ring-2 focus:ring-primary-color border-gray-200 py-3 px-4 rounded-lg`}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-600 mb-2"
                            htmlFor=""
                        >
                            Password
                        </label>
                        <input
                            placeholder="Enter Password"
                            type="password"
                            className={`focus:outline-none w-full border mt-1 focus:ring-2 focus:ring-primary-color  border-gray-200 py-3 px-4 rounded-lg`}
                        />
                    </div>
                    <button className="focus:outline-none w-full text-white bg-primary-color py-3 px-4 rounded-lg hover:bg-secondary-color transition">
                        Login
                    </button>
                </form>
                <p className="text-center text-md text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to={`/register`}
                        className="text-md text-primary-color hover:underline font-medium"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
