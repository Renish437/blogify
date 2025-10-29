import { uploadCloudinary } from "../helpers/cloudinary.js";
import Blog from "../models/blog.models.js";

const createBlog = async (req, res) => {
  try {
    const { title, content, read_time, status, category } = req.body;
    if (!title?.trim() || !category?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Title and Category are required fields",
        data: {},
      });
    }

    const blogObj = {
      title,
      content,
      read_time,
      status,
      category,
      user: req.user?._id,
    };
    const filePath = req?.file?.path;
    if (filePath) {
      const response = await uploadCloudinary(filePath);
      blogObj.image = response.url;
    }
    const blog = await Blog.create(blogObj);
    return res.status(200).json({
      status: true,
      message: "Blog added successfully.",
      data: {
        blog: blog,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id); // 👈 Add await here

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found.",
        data: {},
      });
    }

    const { title, content, read_time, status, category } = req.body;

    if (!title?.trim() || !category?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Title and Category are required fields",
        data: {},
      });
    }

    const blogObj = {
      title,
      content,
      read_time,
      status,
      category,
      user: req.user?._id,
    };

    // Handle image update if a file is uploaded
    const filePath = req?.file?.path;
    if (filePath) {
      const response = await uploadCloudinary(filePath);
      blogObj.image = response.url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogObj, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "Blog updated successfully.",
      data: { blog: updatedBlog },
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};
const getBlogs =async (req,res)=>{
    try {
        const {category} =req.query

      
        let filter={
            status:"active"
        };
        if(category && category != "all"){
            filter.category= category
        }
        const blogs = await  Blog.find(filter)
        res.status(200).json({
            status:true,
            message:"",
            data:{
                blogs:blogs
            }
        })
    } catch (error) {
         res.status(500).json({
            status:false,
            message:error.message,
            data:{}
        })
    }
}
const getUserBlogs = async (req,res)=>{
     try {
        const userId = req?.user?._id

      
        // let filter={
        //     status:"active"
        // };
        // if(category && category != "all"){
        //     filter.category= category
        // }
        const blogs = await  Blog.find({user:userId})
        res.status(200).json({
            status:true,
            message:"",
            data:{
                blogs:blogs
            }
        })
    } catch (error) {
         res.status(500).json({
            status:false,
            message:error.message,
            data:{}
        })
    }
}

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req?.user?._id;

    // Find blog owned by the logged-in user
    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
    });

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found or unauthorized to delete.",
        data: {},
      });
    }

    await Blog.deleteOne({ _id: blogId });

    return res.status(200).json({
      status: true,
      message: "Blog deleted successfully.",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

export { createBlog, updateBlog,getBlogs,getUserBlogs ,deleteBlog};
