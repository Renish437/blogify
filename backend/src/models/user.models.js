import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 5,
    },
    avatar: String,
    avatarPublicId: String,
    bio: String,
    location: String,
  },
  { timestamps: true }
);

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare passwords
userSchema.methods.isPasswordMatched = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Instance method to generate JWT token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET, // make sure this exists in .env
    { expiresIn: "1h" } // token expires in 1 hour
  );
};

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
