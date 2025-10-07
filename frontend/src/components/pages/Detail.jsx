import React, { useState, useEffect } from 'react'
import Layout from '../common/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import { HeartIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

      const [commentText, setCommentText] = useState(''); 

   


    useEffect(() => {
        const blogData = {
            id: 1,
            title: "A Relentless Pursuit of Perfection in Product Design",
            content: `
                <p class="mb-4">It begins to notice that there was a sharp contrast between well-made designs and how they impacted the overall user experience. The journey to perfection in product design is not just about aesthetics, but about creating meaningful interactions that resonate with users.</p>
                <p class="mb-4">The process of achieving perfection in product design is iterative and never-ending. It requires a deep understanding of user needs, technical constraints, and business objectives. Designers must constantly balance these competing demands while maintaining their creative vision.</p>
                <h2 class="text-xl font-semibold mb-3 mt-6">The Role of User Research</h2>
                <p class="mb-4">User research plays a crucial role in informing design decisions. Through careful observation and analysis, designers can identify pain points and opportunities for improvement. This data-driven approach helps ensure that design choices are grounded in real user needs rather than assumptions.</p>
            `,
            author: "Phoenix Baker",
            authorRole: "Senior Product Designer",
            authorImage: "https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797702/portrait-4599553_1280_z8vzik.jpg",
            date: "19 Jan 2024",
            imageUrl: "https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797702/portrait-4599553_1280_z8vzik.jpg",
            readTime: "5 min read"
        };
        setBlog(blogData);

        // Simulated comments
        const commentsData = [
            {
                id: 1,
                author: "Sarah Miller",
                authorImage: "https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797851/portrait-787522_1280_p6fluq.jpg",
                content: "This is a great article! The insights about user research are particularly valuable.",
                date: "2 hours ago"
            },
            {
                id: 2,
                author: "James Wilson",
                authorImage: "https://res.cloudinary.com/dgcqtwfbj/image/upload/v1756797987/butterfly-9791233_1280_ys6yeg.jpg",
                content: "I appreciate how you broke down the design process. Very insightful!",
                date: "5 hours ago"
            }
        ];
        setComments(commentsData);
    }, [id]);

    

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    if (!blog) return null;

    return (
        <Layout>
            <article className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to articles</span>
                    </button>
                    
                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {blog.title}
                        </h1>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img 
                                    src={blog.authorImage} 
                                    alt={blog.author}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-medium text-gray-900">{blog.author}</h3>
                                    <div className="text-sm text-gray-500">
                                        <span>{blog.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{blog.readTime}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={toggleFavorite}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    {isFavorite ? (
                                        <HeartIconSolid className="w-6 h-6 text-red-500" />
                                    ) : (
                                        <HeartIcon className="w-6 h-6 text-gray-600" />
                                    )}
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <ShareIcon className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="relative aspect-[16/9] mb-8">
                        <img 
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="rounded-xl w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div 
                        className="prose prose-lg max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />


                    {/* Comments Section */}
                    <section className="border-t border-gray-200 pt-12">
                        <h2 className="text-2xl font-semibold mb-8">Comments ({comments.length})</h2>
                        
                        {/* Comment Form */}
                        <form  className="mb-12">
                            <textarea
                                 value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-primary-color resize-none h-32"
                            />
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color transition-colors"
                                   
                                >
                                    Post Comment
                                </button>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-8">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex space-x-4">
                                    <img 
                                        src={comment.authorImage}
                                        alt={comment.author}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="font-medium text-gray-900">
                                                {comment.author}
                                            </h4>
                                            <span className="text-sm text-gray-500">
                                                {comment.date}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </article>
        </Layout>
    )
}

export default Detail
