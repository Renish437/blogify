import React, { useState } from "react";
import Layout from "../common/Layout";
import Sidebar from "./Sidebar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import instance from "../common/axiosConfig";
import Loader from "../common/Loader";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Local confirm password validation
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "New password and confirm password do not match",
      });
      return;
    }

    setLoading(true);
 try {
  const res = await instance.put("/users/update-password", {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  });

  // Successful response (2xx)
  if (res.data.success) {
    toast.success(res.data.message);
    reset();
  }
} catch (error) {
  // Axios error response
  const msg = error?.response?.data?.message || "Failed to update password!";
  toast.error(msg);

  // If backend says current password is incorrect, show under field
  if (msg === "Current password is incorrect") {
    setError("currentPassword", { type: "manual", message: msg });
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-8">
            <Sidebar />
            <main className="flex-1">
              <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Change Password
                  </h3>

                  <form
                    className="space-y-4 max-w-full"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* Current Password */}
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 my-3"
                      >
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        {...register("currentPassword", {
                          required: "Current password is required",
                        })}
                        className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                        placeholder="Enter your current password"
                      />
                      {errors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 my-3"
                      >
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        {...register("newPassword", {
                          required: "New password is required",
                          minLength: {
                            value: 8,
                            message: "Minimum 8 characters required",
                          },
                        })}
                        className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                        placeholder="Enter your new password"
                      />
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.newPassword.message}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Minimum 8 characters
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 my-3"
                      >
                        Confirm New Password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                        })}
                        className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                        placeholder="Confirm your new password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary-color hover:bg-secondary-color"
                        }`}
                      >
                        {loading && <Loader />}
                        {loading ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
