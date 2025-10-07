import mongoose from "mongoose";

const connectDB = async (params) => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected");
    } catch (error) {
        console.log("Error here"+error);
        
    }
}
export {connectDB}