import React, { useState, useEffect } from 'react'
import Layout from '../common/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import { HeartIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import instance from '../common/axiosConfig'
import moment from 'moment'

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

      const [commentText, setCommentText] = useState(''); 
      const params= useParams();

      const getBlog = async ()=>{
        try {
            const {data,message,success} = await instance.get(`/blogs/${params.id}/get-blog-front`);
            if(success){
                setBlog(data?.blog);
            }
        } catch (error) {
            console.log(error.message|| "Something went wrong.");
            
        }
      }

   


    useEffect(() => {
        getBlog();
       
        

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
                                 {/* <img 
                                    src={blog.authorImage} 
                                    alt={blog.author}
                                    className="w-12 h-12 rounded-full object-cover"
                                /> */}
                                <div>
                                    <h3 className="font-medium text-gray-900">{blog?.user?.name}</h3>
                                    <div className="text-sm text-gray-500">
                                        <span>{moment(blog.createdAt).format("DD MMM YYYY")}</span>
                                        <span className="mx-2">•</span>
                                        <span>{blog.read_time} mins</span>
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
         
                   {
                    blog.image &&  <div className="relative aspect-[16/9] mb-8">
                        <img 
                            src={blog.image}
                            alt={blog.title}
                            className="rounded-xl w-full h-full object-cover"
                        />
                    </div>
                   }
                   

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
