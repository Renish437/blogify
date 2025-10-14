
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link,  useNavigate } from "react-router-dom";
import instance from "../common/axiosConfig";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const password = watch("password");
  const registerUser = async (formData) => {
    setLoading(true);
    try {
      const { success,message, data } = await instance.post(`/users/register`, formData);
     
      console.log(data, success);

      if(success){
         toast.success(message);
         navigate('/login')
      }
    } catch (error) {
      const message = error.response.data?.message || "Something went wrong"
       toast.error(message);
      
    }finally{
        setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-9">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(registerUser)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              {...register("name", {
                required: "The name field is required",
              })}
              id="name"
              type="text"
              placeholder="Enter your name"
              className={`w-full border  border-gray-200 py-3 px-4 rounded-lg  focus:outline-none ${errors.name && "border-red-400 "}`}
            />
            {errors.name && (
              <p className="text-red-400">{errors.name?.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "The email field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full border  border-gray-200 py-3 px-4 rounded-lg  focus:outline-none ${errors.email && "border-red-400 "}`}
            />
            {errors.email && (
              <p className="text-red-400">{errors.email?.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "The password field is required",
                minLength: {
                  value: 5,
                  message: "The password must be atleast 5 characters.",
                },
              })}
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`w-full border  border-gray-200 py-3 px-4 rounded-lg  focus:outline-none ${errors.password && "border-red-400 "}`}
            />
            {errors.password && (
              <p className="text-red-400">{errors.password?.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              {...register("confirm_password", {
                required: "Please confirm your password.",
                validate: (value) => {
                  return (
                    password === value ||
                    "Confirm password must match with password"
                  );
                },
                minLength: {
                  value: 5,
                  message: "The password must be atleast 5 characters.",
                },
              })}
              type="password"
              placeholder="Confirm your password"
              className={`w-full border  border-gray-200 py-3 px-4 rounded-lg  focus:outline-none ${errors.name && "border-red-400 "}`}
            />
            {errors.confirm_password && (
              <p className="text-red-400">{errors.confirm_password?.message}</p>
            )}
          </div>

          {/* Submit Button */}
         <button
            type="submit"
            disabled={loading} // disable button while loading
            className="w-full py-3 px-4 cursor-pointer bg-primary-color text-white font-semibold rounded-lg shadow-md transition  active:bg-primary-color flex items-center justify-center"
          >
            {loading ? (
           < Loader/>
            ) : null}
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-md text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-color cursor-pointer hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
