import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
 // your axios instance
// optional: spinner component
import instance from "../common/axiosConfig";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { AuthContext } from "../context/Auth";

const Login = () => {
    const {login} =useContext(AuthContext);
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (formData) => {
    setLoading(true);
   
    try {
      const {data,success,message} = await instance.post("/users/login", formData);
      

      if(success){
        const userInfo = {
            token:data.accessToken
        }
        localStorage.setItem("blogifyUserToken",JSON.stringify(userInfo))
        login(userInfo)
        toast.success(message)
            // Redirect to dashboard or home
      navigate("/profile");
      }

      // Optionally store the token
    //   localStorage.setItem("accessToken", data.accessToken);

    console.log(data);
    

    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message)

    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-9">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        

        <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
               {...register("email", {
                required: "The email field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter Email"
              className={`w-full border border-gray-200 py-3 px-4 rounded-lg focus:outline-none  ${
                errors.email && "border-red-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
               {...register("password", {
                required: "The password field is required",
                minLength: {
                  value: 5,
                  message: "The password must be atleast 5 characters.",
                },
              })}
              placeholder="Enter Password"
              className={`w-full border border-gray-200 py-3 px-4 rounded-lg focus:outline-none  ${
                errors.password && "border-red-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary-color cursor-pointer text-white rounded-lg flex justify-center items-center  transition"
          >
            {loading && (
             <Loader/>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-md text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary-color hover:underline cursor-pointer font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
