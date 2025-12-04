import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import instance from "../common/axiosConfig";
import Loader from "../common/Loader";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);           // saved in DB
  const [tempAvatar, setTempAvatar] = useState(null);   // temp preview
  const [selectedImageFile, setSelectedImageFile] = useState(null); // file to upload
  const [loading, setLoading] = useState(false);       // loading state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // -----------------------------
  // GET USER INFO
  // -----------------------------
  const getUserInfo = async () => {
    try {
      const res = await instance.get("/users/get-user");
      if (res.success) {
        setAvatar(res.data?.user?.avatar);
        reset({
          name: res.data?.user?.name,
          email: res.data?.user?.email,
          bio: res.data?.user?.bio,
          location: res.data?.user?.location,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load user info!");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // -----------------------------
  // SELECT IMAGE → SHOW PREVIEW ONLY
  // -----------------------------
  const handleProfilePicPreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImageFile(file);
    setTempAvatar(URL.createObjectURL(file)); // show preview instantly
  };

  // -----------------------------
  // UPDATE PROFILE + IMAGE (IF SELECTED)
  // -----------------------------
  const updateProfile = async (formData) => {
    setLoading(true); // start loading
    try {
      let uploadedImageUrl = avatar; // default to existing

      // If new image selected → upload to Backend
      if (selectedImageFile) {
        const imgData = new FormData();
        imgData.append("image", selectedImageFile);

        const imgRes = await instance.put("/users/update-profile-pic", imgData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (imgRes.success) {
          uploadedImageUrl = imgRes.data.url;
          setAvatar(uploadedImageUrl);
          setTempAvatar(null);
          setSelectedImageFile(null);
        }
      }

      // Send profile text update
      const res = await instance.put("/users/update-profile", formData);

      if (res.success) {
        reset({
          name: res.data?.user?.name,
          email: res.data?.user?.email,
          bio: res.data?.user?.bio,
          location: res.data?.user?.location,
        });

        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false); // stop loading
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
                    Profile Information
                  </h3>

                  <div className="flex flex-col md:flex-row gap-10">
                    {/* Profile Image */}
                    <div className="md:w-1/3">
                      <div className="aspect-square w-full max-w-[200px] mx-auto relative">
                        <img
                          src={
                            tempAvatar ||
                            avatar ||
                            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                          }
                          alt="Profile"
                          className="rounded-full w-full h-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("profilePicInput").click()
                          }
                          className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
                        >
                          <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
                        </button>

                        <input
                          id="profilePicInput"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleProfilePicPreview}
                        />
                      </div>
                    </div>

                    {/* FORM */}
                    <div className="md:w-2/3 space-y-8">
                      <form onSubmit={handleSubmit(updateProfile)}>
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 my-3">
                            Full Name
                          </label>
                          <input
                            {...register("name", {
                              required: "Full name is required",
                            })}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md"
                            placeholder="Enter your full name"
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 my-3">
                            Email Address
                          </label>
                          <input
                            {...register("email")}
                            disabled
                            className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md"
                          />
                        </div>

                        {/* Bio */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 my-3">
                            Bio
                          </label>
                          <textarea
                            {...register("bio")}
                            rows={3}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md"
                            placeholder="Write a few sentences about yourself"
                          ></textarea>
                        </div>

                        {/* Location */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 my-3">
                            Location
                          </label>
                          <input
                            {...register("location")}
                            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md"
                            placeholder="City, Country"
                          />
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={loading}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white ${
                            
                              "bg-primary-color hover:bg-secondary-color"
                            }`}
                          >
                            {loading && (
                             <Loader/>
                            )}
                            {loading ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                {/* <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Account Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Posts</p>
                      <p className="text-2xl font-semibold text-gray-900">24</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Comments</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        142
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        5 Aug, 2025
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
