import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
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

export { register };
