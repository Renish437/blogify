import React, { useState, useEffect } from 'react'
import Layout from '../common/Layout'

const Home = () => {
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [mainFeatured, setMainFeatured] = useState(null);
    const [latestBlogs, setLatestBlogs] = useState([]);

    // Temporary featured blogs data (replace with API call later)
    useEffect(() => {
        const featuredBlogsArray = [
            {
                id: 1,
                title: "A Relentless Pursuit of Perfection in Product Design",
                excerpt: "It begins to notice that there was a sharp contrast between well-made designs and how they impacted the overall user experience. The journey to perfection in product design is not just about aesthetics, but about creating meaningful interactions that resonate with users.",
                author: "Phoenix Baker",
                date: "19 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797702/portrait-4599553_1280_z8vzik.jpg",
                tags: ["Design", "Research"]
            },
            {
                id: 2,
                title: "How to Run a Successful Business With Your Partner",
                excerpt: "Starting a business with your spouse or significant other is an exciting but challenging venture...",
                author: "Lana Steiner",
                date: "18 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797851/portrait-787522_1280_p6fluq.jpg",
                tags: ["Business", "Research"]
            },
            {
                id: 3,
                title: "Why Food Matters — Disease Prevention & Treatment",
                excerpt: "Eating more plants and less meat has been tied to a longer life and a reduced risk of...",
                author: "Lana Steiner",
                date: "18 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797702/portrait-4599553_1280_z8vzik.jpg",
                tags: ["Health", "Research"]
            },
            {
                id: 4,
                title: "Conversations with London Makr & Co.",
                excerpt: "We sat down with London's fast-growing brand and product design studio, Makr & Co. to find out how they've used...",
                author: "Olivia Rhye",
                date: "20 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797987/butterfly-9791233_1280_ys6yeg.jpg",
                tags: ["Design", "Research", "Interview"]
            },
            {
                id: 5,
                title: "Conversations with London Makr & Co.",
                excerpt: "We sat down with London's fast-growing brand and product design studio, Makr & Co. to find out how they've used...",
                author: "Olivia Rhye",
                date: "20 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756575047/cld-sample-4.jpg",
                tags: ["Design", "Research", "Interview"]
            }
            
        ];

        const latestBlogsArray = [
            {
                id: 1,
                title: "A Relentless Pursuit of Perfection in Product Design",
                excerpt: "It begins to notice that there was a sharp contrast between well-made designs and how they impacted the overall user experience. The journey to perfection in product design is not just about aesthetics, but about creating meaningful interactions that resonate with users.",
                author: "Phoenix Baker",
                date: "19 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797702/portrait-4599553_1280_z8vzik.jpg",
                tags: ["Design", "Research"]
            },
            {
                id: 2,
                title: "How to Run a Successful Business With Your Partner",
                excerpt: "Starting a business with your spouse or significant other is an exciting but challenging venture...",
                author: "Lana Steiner",
                date: "18 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797851/portrait-787522_1280_p6fluq.jpg",
                tags: ["Business", "Research"]
            },
            {
                id: 3,
                title: "Why Food Matters — Disease Prevention & Treatment",
                excerpt: "Eating more plants and less meat has been tied to a longer life and a reduced risk of...",
                author: "Lana Steiner",
                date: "18 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797702/portrait-4599553_1280_z8vzik.jpg",
                tags: ["Health", "Research"]
            },
            {
                id: 4,
                title: "Conversations with London Makr & Co.",
                excerpt: "We sat down with London's fast-growing brand and product design studio, Makr & Co. to find out how they've used...",
                author: "Olivia Rhye",
                date: "20 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756797987/butterfly-9791233_1280_ys6yeg.jpg",
                tags: ["Design", "Research", "Interview"]
            },
            {
                id: 5,
                title: "Conversations with London Makr & Co.",
                excerpt: "We sat down with London's fast-growing brand and product design studio, Makr & Co. to find out how they've used...",
                author: "Olivia Rhye",
                date: "20 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756575047/cld-sample-4.jpg",
                tags: ["Design", "Research", "Interview"]
            },
            {
                id: 6,
                title: "Conversations with London Makr & Co.",
                excerpt: "We sat down with London's fast-growing brand and product design studio, Makr & Co. to find out how they've used...",
                author: "Olivia Rhye",
                date: "20 Jan 2024",
                imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/w_450/v1756575047/cld-sample-4.jpg",
                tags: ["Design", "Research", "Interview"]
            }
            
        ];

        setMainFeatured(featuredBlogsArray[0]);
        setFeaturedBlogs(featuredBlogsArray.slice(1));
        setLatestBlogs(latestBlogsArray)
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
                            <article className="group cursor-pointer">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                                    <img 
                                        src={mainFeatured.imageUrl}
                                        alt={mainFeatured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                    <span>{mainFeatured.date}</span>
                                    <span className="text-gray-300">•</span>
                                    <span>{mainFeatured.author}</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-600">
                                    {mainFeatured.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {mainFeatured.excerpt}
                                </p>
                            </article>
                        )}

                        {/* Right side - 3 smaller articles */}
                        <div className="space-y-6">
                            {featuredBlogs.map(blog => (
                                <article key={blog.id} className="group flex gap-6 cursor-pointer">
                                    <div className="flex-shrink-0">
                                        <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                                            <img 
                                                src={blog.imageUrl}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <span>{blog.date}</span>
                                            <span className="text-gray-300">•</span>
                                            <span>{blog.author}</span>
                                        </div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-gray-600 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        
                                    </div>
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
                </div>
            </section>
        </Layout>
    )
}

export default Home