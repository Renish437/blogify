import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Sidebar from "./Sidebar";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import instance from "../common/axiosConfig";
import moment from "moment";
import toast from "react-hot-toast";

const FavBlog = () => {
  const [favorites, setFavorites] = useState([]);

  const getFavBlogs = async () => {
    try {
      const response = await instance.get("/blogs/get-favorite-blogs");
      const { success, data } = response;

      if (success) {
        setFavorites(data.favorites || []);
      }
    } catch (error) {
      console.log(error || "Something went wrong!");
    }
  };

  const removeFromFavorite = async (blogId) => {
    try {
      const response = await instance.post("/blogs/add-to-favorite", {
        blogId,
      });

      if (response.success) {
       
        setFavorites((prev) => prev.filter((item) => item.blog._id !== blogId));
         toast.success("Removed from favorites");
      }
    } catch (error) {
      toast.error("Failed to remove favorite");
    }
  };

  useEffect(() => {
    getFavBlogs();
  }, []);

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-8">
            <Sidebar />

            <main className="flex-1">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Favorite Articles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {favorites.length > 0 ? (
                    favorites.map((fav) => {
                      const blog = fav.blog;

                      return (
                        <article key={blog._id} className="group">
                          <Link to={`/blogs/${blog._id}`}>
                            <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
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
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeFromFavorite(blog._id);
                                }}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white"
                              >
                                <HeartIcon className="w-5 h-5 text-red-500" />
                              </button>
                            </div>
                          </Link>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <span>
                              {moment(blog.createdAt).format("DD MMM YYYY")}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span>{blog.user?.name}</span>
                            <span className="text-gray-300">•</span>
                            <span>{blog.read_time} min read</span>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {blog.title}
                          </h3>

                          <p className="text-gray-600 line-clamp-2">
                            {blog.content?.replace(/<[^>]+>/g, "")}
                          </p>
                        </article>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center py-20">
                      <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        No Favorite Blogs
                      </h2>
                      <p className="text-gray-500">
                        You haven't added any blog to favorites yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FavBlog;
