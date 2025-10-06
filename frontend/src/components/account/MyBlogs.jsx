import React from 'react'
import Sidebar from './Sidebar'
import Layout from '../common/Layout'

const MyBlogs = () => {
  return (
    <Layout>
        <div className="py-8">
            <div className="container mx-auto px-4 max-w-[1440px]">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <Sidebar/>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="space-y-6">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">My Blogs</h3>
                                    <button
                                        onClick={() => {
                                            // Add navigation to new blog form
                                            console.log('Add new blog');
                                        }}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-color hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add New Blog
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <article className="group cursor-pointer">
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
                                            <img 
                                                src="https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797702/portrait-4599553_1280_z8vzik.jpg"
                                                alt="Blog cover"
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Published</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <span>19 Jan 2024</span>
                                            <span className="text-gray-300">•</span>
                                            <span>5 min read</span>
                                            <span className="text-gray-300">•</span>
                                            <span>125 views</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">A Relentless Pursuit of Perfection in Product Design</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            It begins to notice that there was a sharp contrast between well-made designs and how they impacted the overall user experience. The journey to perfection in product design is not just about aesthetics.
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </article>

                                    <article className="group cursor-pointer">
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
                                            <img 
                                                src="https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797851/portrait-787522_1280_p6fluq.jpg"
                                                alt="Blog cover"
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">Draft</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <span>18 Jan 2024</span>
                                            <span className="text-gray-300">•</span>
                                            <span>3 min read</span>
                                            <span className="text-gray-300">•</span>
                                            <span>0 views</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Run a Successful Business With Your Partner</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            Starting a business with your spouse or significant other is an exciting but challenging venture. Here's what you need to know about making it work.
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>        
    </Layout>
  )
}

export default MyBlogs
