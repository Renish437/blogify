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

export { register, login };
