import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import Sidebar from "../account/Sidebar";
import Layout from "../common/Layout";
import JoditEditor from "jodit-react";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../common/axiosConfig";
import Loader from "../common/Loader";

const UpdateBlog = ({ placeholder }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const params = useParams();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
      height: "400px",
    }),
    [placeholder]
  );
  const onSubmit = async (fomData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", fomData.title);
      formData.append("read_time", fomData.read_time);
      formData.append("category", fomData.category);
      formData.append("content", content);
      formData.append("status", fomData.status);
      formData.append("image", fomData.image[0]);

      const response = await instance.put(
        `/blogs/${params.id}/update`,
        formData
      );
      const { success, message } = response;
      if (success) {
        toast.success(message);
        navigate("/my-blogs");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getBlog = async () => {
    try {
      const response = await instance.get(`/blogs/${params.id}/get-blog`);
      const { success, data, message } = response;

      if (success && data && data.blog) {
        const blogData = data.blog;

        reset({
          title: blogData.title,
          read_time: blogData.read_time,
          category: blogData.category,
          status: blogData.status,
          is_featured: blogData.is_featured || "no",
        });

        setContent(blogData.content); // <- important
        setBlog(blogData);
      } else {
        toast.error(message || "Failed to load blog");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getBlog();
    console.log(content);
  }, [params.id, content]);
  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1">
              <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Edit Blog
                  </h3>
                  <div className="min-h-screen  flex justify-center py-10 px-6">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className=" w-full max-w-5xl p-2"
                    >
                      <h2 className="text-2xl font-semibold text-gray-600 border-b pb-4 mb-8">
                        📝 Edit Blog
                      </h2>

                      {/* GRID layout for two-column fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Title */}
                        <div>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            {...register("title", {
                              required: "The title field is required",
                            })}
                            type="text"
                            id="title"
                            placeholder="Enter blog title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-color focus:outline-none"
                          />
                          {errors.title && (
                            <p className="text-red-500 font-medium mt-1">
                              {errors?.title?.message}
                            </p>
                          )}
                        </div>

                        {/* Category */}
                        <div>
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Category <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register("category", {
                              required: "The category field is required",
                            })}
                            id="category"
                            className="w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-color focus:outline-none"
                          >
                            <option value="">Select category</option>
                            <option value="Technology">Technology</option>
                            <option value="Development">Development</option>
                            <option value="Others">Others</option>
                          </select>
                          {errors.title && (
                            <p className="text-red-500 font-medium mt-1">
                              {errors?.category?.message}
                            </p>
                          )}
                        </div>

                        {/* Read Time */}
                        <div>
                          <label
                            htmlFor="read_time"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Estimated Read Time
                          </label>
                          <input
                            {...register("read_time")}
                            type="text"
                            id="read_time"
                            placeholder="e.g., 5 min"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-color focus:outline-none"
                          />
                          {errors.title && (
                            <p className="text-red-500 font-medium">
                              {errors?.read_time?.message}
                            </p>
                          )}
                        </div>

                        {/* Image */}
                        <div>
                          <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Upload Image
                          </label>
                          <input
                            {...register("image")}
                            type="file"
                            id="image"
                            accept="image/*"
                            className="w-full text-gray-700 border border-gray-300 rounded-md cursor-pointer 
               file:mr-4 file:py-3.5 file:px-4 file:rounded-md file:border-0 shadow
               file:text-sm file:font-semibold file:bg-primary-color/90 file:text-white 
               hover:file:bg-primary-color/90"
                          />

                          {blog.image && (
                            <img
                              src={`${blog.image}`}
                              alt="Blog cover"
                              className="w-50 rounded mx-2 my-2 object-cover"
                            />
                          )}
                        </div>

                        {/* Status */}
                        <div>
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Status
                          </label>
                          <select
                            {...register("status")}
                            id="status"
                            className="w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-color focus:outline-none"
                          >
                            <option value="active">Active</option>
                            <option value="block">Block</option>
                          </select>
                        </div>

                        {/* Featured */}
                        <div>
                          <label
                            htmlFor="is_featured"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Featured Post?
                          </label>
                          <select
                            id="is_featured"
                            {...register("is_featured")}
                            className="w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-color focus:outline-none"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                        </div>
                      </div>

                      {/* Content (full width) */}
                      <div className="mt-8">
                        <label
                          htmlFor="content"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Content
                        </label>
                        {blog._id && (
                          <JoditEditor
                            key={blog._id} // ensures editor re-mounts
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1}
                            onBlur={(newContent) => setContent(newContent)}
                          />
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="mt-10 flex justify-end">
                        <button
                          type="submit"
                          className="bg-primary-color text-white px-6 py-3 rounded-md font-medium shadow hover:bg-primary-color/90 transition-all"
                          disabled={loading}
                        >
                          {!loading ? (
                            "Update Blog"
                          ) : (
                            <>
                              <Loader /> Updating...
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateBlog;
