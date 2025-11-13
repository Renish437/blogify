import React, { useState, useEffect } from 'react'
import Layout from '../common/Layout'
import instance from '../common/axiosConfig';
import moment from "moment";
import { Link } from 'react-router-dom';

const Home = () => {
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [mainFeatured, setMainFeatured] = useState(null);
    const [latestBlogs, setLatestBlogs] = useState([]);

  const getFeaturedBlogs = async () => {
    try {
      const { data, message, success } = await instance.get("/blogs/get-featured-blogs");

      if (success) {
        console.log("Featured Blogs:", data);
        setFeaturedBlogs(data.blogs)
           
           if (data.blogs) {
             setMainFeatured(data?.blogs[0]);
            setFeaturedBlogs(data?.blogs.slice(1))
           }
      } else {
        console.log(message || "Failed to fetch featured blogs");
      }
    } catch (error) {
      console.log(error?.message || "Something went wrong");
    }
  };
  const getLatestBlogs = async () => {
    try {
      const { data, message, success } = await instance.get("/blogs/get-blogs?limit=6");

      if (success) {
        console.log("Featured Blogs:", data);
     
           
          
             setLatestBlogs(data?.blogs);
           
           
      } else {
        console.log(message || "Failed to fetch featured blogs");
      }
    } catch (error) {
      console.log(error?.message || "Something went wrong");
    }
  };

    // Temporary featured blogs data (replace with API call later)
    useEffect(() => {
        getFeaturedBlogs();
        getLatestBlogs();
        
      
   

      
         
        
        
       
    }, []);

    return (
        <Layout>
            <section className="featured-blogs py-12 ">
                <div className="container mx-auto px-4 max-w-[1440px]">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900">Featured Articles</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left side - Main featured article */}
                        {mainFeatured && (
                            <article key={mainFeatured._id} className="group cursor-pointer">
                                <Link to={`/detail/${mainFeatured._id}`}>
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                                    <img 
                                        src={mainFeatured.image}
                                        alt={mainFeatured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                    <span>{moment(mainFeatured.createdAt).format("DD MMM YYYY")}</span>
                                    <span className="text-gray-300">•</span>
                                    <span>{mainFeatured?.user?.name}</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-600">
                                    {mainFeatured.title}
                                </h3>
                                {/* <p className="text-gray-600 mb-4 line-clamp-3">
                                    {mainFeatured.excerpt}
                                </p> */}
                                </Link>
                            </article>
                        )}

                        {/* Right side - 3 smaller articles */}
                        <div className="space-y-6">
                            {featuredBlogs.map(blog => (
                                <article key={blog._id} className="group flex gap-6 cursor-pointer">
                                     <Link to={`/detail/${blog._id}`}>
                                    <div className="flex-shrink-0">
                                        <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                                            <img 
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <span>{moment(blog.createdAt).format("DD MMM YYYY")}</span>
                                            <span className="text-gray-300">•</span>
                                            <span>{blog?.user?.name}</span>
                                        </div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-gray-600 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        
                                    </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="latest-blogs bg-light py-12">
                <div className="container mx-auto px-4 max-w-[1440px]">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900">Latest Articles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestBlogs.map(blog => (
                            <article key={blog._id} className="group cursor-pointer">
                                   <Link to={`/detail/${blog._id}`}>
                                <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
                                    <img 
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <span>{moment(blog.createdAt).format("DD MMM YYYY")}</span>
                                    <span className="text-gray-300">•</span>
                                    <span>{blog?.user?.name}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 line-clamp-2">
                                    {blog.title}
                                </h3>
                                {/* <p className="text-gray-600 mb-4 line-clamp-2">
                                    {blog.excerpt}
                                </p> */}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Home