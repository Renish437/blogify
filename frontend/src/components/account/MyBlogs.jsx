import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Layout from "../common/Layout";
import { Link } from "react-router-dom";
import instance from "../common/axiosConfig";
import moment from "moment";
import toast from "react-hot-toast";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs
  const getBlogs = async () => {
    try {
      const response = await instance.get("/blogs/get-user-blogs");
      const { success, data } = response;
      if (success) {
        setBlogs(data.blogs || data.blog || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Delete blog
 const deleteBlog = async (id) => {
  if (!id) return;

  try {
    // Send DELETE request
    const response = await instance.delete(`/blogs/${id}/delete`);
    const { success, message } = response;

    if (success) {
      toast.success(message || "Blog deleted successfully");
      // Remove deleted blog from state
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } else {
      toast.error(message || "Failed to delete blog");
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    toast.error(error.response?.data?.message || error.message || "Something went wrong");
  } finally {
    // Close confirmation modal
    setShowModal(false);
    setSelectedBlog(null);
  }
};


  useEffect(() => {
    getBlogs();

  }, []);

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-8">
            <Sidebar />
            <main className="flex-1">
              <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">My Blogs</h3>
                    <Link
                      to="/blogs/create"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-color hover:bg-secondary-color"
                    >
                      Add New Blog
                    </Link>
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {blogs && blogs.length > 0 ? (
    blogs.map((blog) => (
      <article key={blog._id} className="group cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
          <Link to={`/detail/${blog._id}`}>
          {blog.image ? (
            <img
              src={blog.image}
              alt="Blog cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={`https://placehold.co/600x400?text=${blog.title}`}
              alt="Blog cover"
              className="w-full h-full object-cover"
            />
          )}
          </Link>

          {blog.status === "active" && (
            <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
              Published
            </span>
          )}
          {blog.status === "block" && (
            <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
              Draft
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>{moment(blog.createdAt).format("DD MMM, YYYY")}</span>
          <span className="text-gray-300">•</span>
          <span>{blog.read_time} min read</span>
        </div>

  <Link to={`/detail/${blog._id}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {blog.title}
        </h3>
  </Link>

    <p className="text-gray-600 mb-4 line-clamp-2"
   dangerouslySetInnerHTML={{ __html: blog.content || "" }}>
</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to={`/blogs/${blog._id}/edit`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
            >
              Edit
            </Link>

            <button
              onClick={() => {
                setSelectedBlog(blog);
                setShowModal(true);
              }}
              className="text-red-600 cursor-pointer hover:text-red-700 text-sm font-medium inline-flex items-center"
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    ))
  ) : (
    // No blogs message
    <div className="col-span-full text-center py-20">
      <svg
        className="mx-auto h-16 w-16 text-gray-300 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7-7-7M5 10l7-7 7 7"
        />
      </svg>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No Blogs Found
      </h2>
      <p className="text-gray-500">
        You haven’t created any blogs yet. Click “Add New Blog” to get started.
      </p>
      <Link
        to="/blogs/create"
        className="mt-4 inline-block px-6 py-3 bg-primary-color text-white rounded-md hover:bg-secondary-color transition"
      >
        Add New Blog
      </Link>
    </div>
  )}
</div>

                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedBlog && (
          <div className="fixed inset-0 bg-white/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-6">
                Are you sure you want to delete the blog: <strong>{selectedBlog.title}</strong>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 cursor-pointer py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedBlog(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 cursor-pointer py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                  onClick={() => deleteBlog(selectedBlog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyBlogs;
