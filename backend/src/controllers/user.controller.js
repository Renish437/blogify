import { uploadCloudinary } from "../helpers/cloudinary.js";
import User from "../models/user.models.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => !field?.trim())) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: {},
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists, please choose another one.",
        data: {},
      });
    }

   
    const user = await User.create({
      name,
      email,
      password, // Mongoose pre-save hook will hash automatically
    });

    const newUser = await User.findById(user._id).select("-password");

    return res.status(201).json({
      success: true,
      message: "Registered successfully.",
      data: newUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
      data: {},
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => !field?.trim())) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: {},
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        data: {},
      });
    }

    const isPasswordMatched = await user.isPasswordMatched(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        data: {},
      });
    }

    const accessToken = user.generateAccessToken();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { accessToken },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(422).json({
        success: false,
        message: "User id is required!",
        data: {},
      });
    }

    const userData = await User.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: { user: userData },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      data: {},
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, bio, location } = req.body;

    const userId = req?.user?._id;

    if(name.trim()===""){
     return  res.status(422).json({
      success: false,
      message:  "Name field is required!",
      data: {},
    });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio, location },
      { new: true }
    );
    const latestUserData = await User.findById(userId).select("-password");
   return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: { user:latestUserData },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      data: {},
    });
  }
};
const updateProfilePic = async (req, res) => {
  try {
    const userId = req?.user?._id 
    const filePath = req?.file?.path 
    const profilePic = await uploadCloudinary(filePath)
   const updatedUser = await User.findByIdAndUpdate(userId,{
      avatar:profilePic.url,
       avatarPublicId: profilePic.public_id

    })
      return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully!",
      data: { url:profilePic.url, },
    });
  } catch (error) {
      return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      data: {},
    });
  }
}

const updatePassword = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { currentPassword, newPassword } = req.body;

    // 1. Validate input
    if (!currentPassword || !newPassword) {
      return res.status(422).json({
        success: false,
        message: "Both current and new password are required",
        data: {},
      });
    }

    // 2. Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }

    // 3. Check if current password is correct
    const isMatched = await user.isPasswordMatched(currentPassword);
    if (!isMatched) {
      return res.status(422).json({
        success: false,
        message: "Current password is incorrect",
        data: {},
      });
    }

    // 4. Update password (pre-save hook hashes automatically)
    user.password = newPassword;
    await user.save();

    // 5. Success response
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: {},
    });
  }
};

export { register, login, updateProfile, getUser, updateProfilePic, updatePassword };
