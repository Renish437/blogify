import React, { useEffect, useState } from 'react'
import Layout from '../common/Layout'

const Blog = () => {
    const [latestBlogs, setLatestBlogs] = useState([]);

    const categories = [
        { name: 'All', count: 12 },
        { name: 'Design', count: 4 },
        { name: 'Business', count: 3 },
        { name: 'Technology', count: 2 },
        { name: 'Health', count: 2 },
        { name: 'Travel', count: 1 },
    ];

    const latestBlogsArray = [
            {
                id: 1,
                title: "A Relentless Pursuit of Perfection in Product Design",
                excerpt: "It begins to notice that there was a sharp contrast between well-made designs and how they impacted the overall user experience. The journey to perfection in product design is not just about aesthetics, but about creating meaningful interactions that resonate with users.",
                author: "Phoenix Baker",
                date: "19 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797702/portrait-4599553_1280_z8vzik.jpg",
            },
            {
                id: 2,
                title: "How to Run a Successful Business With Your Partner",
                excerpt: "Starting a business with your spouse or significant other is an exciting but challenging venture...",
                author: "Lana Steiner",
                date: "18 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797851/portrait-787522_1280_p6fluq.jpg",
            },
            {
                id: 3,
                title: "Why Food Matters — Disease Prevention & Treatment",
                excerpt: "Eating more plants and less meat has been tied to a longer life and a reduced risk of...",
                author: "Lana Steiner",
                date: "18 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797702/portrait-4599553_1280_z8vzik.jpg",
            },
            {
                id: 4,
                title: "Conversations with London Makr & Co.",
                excerpt: "We sat down with London's fast-growing brand and product design studio, Makr & Co. to find out how they've used...",
                author: "Olivia Rhye",
                date: "20 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797987/butterfly-9791233_1280_ys6yeg.jpg",
            },
            {
                id: 5,
                title: "Conversations with London Makr & Co.",
                excerpt: "We sat down with London's fast-growing brand and product design studio, Makr & Co. to find out how they've used...",
                author: "Olivia Rhye",
                date: "20 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756575047/cld-sample-4.jpg",
            },
            {
                id: 6,
                title: "Conversations with London Makr & Co.",
                excerpt: "We sat down with London's fast-growing brand and product design studio, Makr & Co. to find out how they've used...",
                author: "Olivia Rhye",
                date: "20 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756575047/cld-sample-4.jpg",
            }
            
        ];

    useEffect(() => {
        setLatestBlogs(latestBlogsArray)
    },[]) 
    

    return (
    <Layout>
        <section className="latest-blogs py-12">
            <div className="container mx-auto px-4 max-w-[1440px]">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">All Articles</h2>
                </div>
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                                <nav className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.name}
                                            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-gray-600 hover:bg-gray-50`}
                                        >
                                            <span>{category.name}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <main className="lg:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {latestBlogs.map(blog => (
                                <article key={blog.id} className="group cursor-pointer">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
                                        <img 
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <span>{blog.date}</span>
                                        <span className="text-gray-300">•</span>
                                        <span>{blog.author}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {blog.excerpt}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </section>
    </Layout>
  )
}

export default Blog
