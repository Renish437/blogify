import { uploadCloudinary } from "../helpers/cloudinary.js";
import Blog from "../models/blog.models.js";
import Comment from "../models/comment.models.js";

const createBlog = async (req, res) => {
  try {
    const { title, content, read_time, status, category } = req.body;
    if (!title?.trim() || !category?.trim()) {
      return res.status(400).json({
        success: false,
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
      success: true,
      message: "Blog added successfully.",
      data: {
        blog: blog,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
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
        success: false,
        message: "Blog not found.",
        data: {},
      });
    }

    const { title, content, read_time, status, category } = req.body;

    if (!title?.trim() || !category?.trim()) {
      return res.status(400).json({
        success: false,
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
      success: true,
      message: "Blog updated successfully.",
      data: { blog: updatedBlog },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};
const getBlogs = async (req, res) => {
  try {
    const { category, limit } = req.query;

    let filter = {
      status: "active",
    };

    if (category && category.toLowerCase() !== "all") {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    const blogs = await Blog.find(filter)
      .populate("user", "-password")
      .sort({ createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0);

    res.status(200).json({
      success: true,
      message: "",
      data: {
        blogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const userId = req?.user?._id;

    // let filter={
    //     status:"active"
    // };
    // if(category && category != "all"){
    //     filter.category= category
    // }
    const blogs = await Blog.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "",
      data: {
        blogs: blogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "user",
      "-password"
    );
    res.status(200).json({
      success: true,
      data: { blog },
      message: "",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
        data: {},
      });
    }

    // Find the blog owned by the logged-in user
    const blog = await Blog.findOne({ _id: blogId, user: userId });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or you are not authorized to delete it.",
        data: {},
      });
    }

    // Delete the blog
    await blog.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
      data: { blogId },
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: {},
    });
  }
};
const getFeaturedBlogs = async (req, res) => {
  try {
    const { limit } = req.query;
    let filter = {
      status: "active",
      is_featured: "yes",
    };

    const blogs = await Blog.find(filter)
      .populate("user", "-password") // populate user info except password
      .sort({ createdAt: -1 })
      .limit(limit); // newest first

    res.status(200).json({
      success: true,
      message: "",
      data: {
        blogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { id, comment } = req.body;
    const userId = req.user?._id;
    if (comment.trim() === "") {
      res.status(422).json({
        success: false,
        message: "Comment field is required",
        data: {},
      });
    }
    if (!id) {
      res.status(422).json({
        success: false,
        message: "Blog id field is required",
        data: {},
      });
    }
    const newComment = await Comment.create({
      comment: comment,
      user: userId,
      blog: id,
    });

    const latestComment = await Comment.findById(newComment._id).populate(
      "user",
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      data: {
        comment: latestComment,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blog: blogId })
      .populate("user", "-password")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      message: "",
      data: {
        comments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};


export {
  createBlog,
  updateBlog,
  getBlogs,
  getUserBlogs,
  getSingleBlog,
  getFeaturedBlogs,
  deleteBlog,
  addComment,
  getComments,
 
};
