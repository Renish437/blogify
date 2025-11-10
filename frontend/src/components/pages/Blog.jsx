import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import instance from '../common/axiosConfig';
import moment from 'moment';
import { Link, useSearchParams } from 'react-router-dom';

const Blog = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = [
    { name: 'All' },
    { name: 'Design' },
    { name: 'Development' },
    { name: 'Technology' },
    { name: 'News' },
    { name: 'Education' },
    { name: 'Others' },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let url = "/blogs/get-blogs";
        if (searchParams.get("category") && searchParams.get("category") !== 'all') {
          url += `?category=${searchParams.get("category")}`;
        }
        const { data, message, success } = await instance.get(url);
        if (success) {
          setLatestBlogs(data?.blogs || []);
        } else {
          console.log(message || "Failed to fetch blogs");
          setLatestBlogs([]);
        }
      } catch (error) {
        console.log(error?.message || "Something went wrong");
        setLatestBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchParams]);

  // Determine current category for display
  const currentCategory = searchParams.get("category") || "all";
  const categoryDisplayName = categories.find(
    cat => cat.name.toLowerCase() === currentCategory
  )?.name || "All";

  return (
    <Layout>
      <section className="latest-blogs py-12">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {currentCategory === 'all' ? 'All Articles' : `${categoryDisplayName} Articles`}
            </h2>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <nav className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        to={`/blogs${category.name === 'All' ? '' : `?category=${category.name.toLowerCase()}`}`}
                        key={category.name}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                          (category.name === 'All' && !searchParams.get("category")) ||
                          searchParams.get("category") === category.name.toLowerCase()
                            ? 'bg-gray-100 text-gray-900 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main content */}
            <main className="lg:col-span-9">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                  <p className="text-gray-600">Loading articles...</p>
                </div>
              ) : latestBlogs.length === 0 ? (
              <div className="text-center py-24">
  {/* Icon Container */}
  <div className="mx-auto mb-8 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
    <svg
      className="w-12 h-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2m-6 0h6"
      />
    </svg>
  </div>

  {/* Title */}
  <h3 className="text-2xl font-bold text-gray-900 mb-3">
    No articles found
  </h3>

  {/* Description */}
  <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
    {currentCategory === 'all'
      ? "There are no blog posts available at the moment. Please check back later."
      : `No articles found in the "${categoryDisplayName}" category.`}
  </p>

  {/* CTA Button (only when filtered) */}
  {currentCategory !== 'all' && (
    <Link
      to="/blogs"
      className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary-color text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      View all articles
    </Link>
  )}
</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {latestBlogs.map((blog) => (
                    <article key={blog._id} className="group cursor-pointer">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
                        <img
                          src={blog.image || `https://placehold.co/600x400?text=${blog.title}`} // fallback image
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = `https://placehold.co/600x400?text=${blog.title}`; // fallback on error
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span>{moment(blog.createdAt).format("DD MMM YYYY")}</span>
                        <span className="text-gray-300">•</span>
                        <span>{blog?.user?.name || 'Anonymous'}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 line-clamp-2">
                        {blog.title}
                      </h3>
                    </article>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;