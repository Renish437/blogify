import mongoose, { Schema } from "mongoose";


const blogSchema = new Schema({
           title:{
            type:String,
            required:true
           },
        category:{
            type:String,
            required:true
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        read_time:{
            type:String,

        },
        image:{
            type:String
        },
        status:{
            type:String,
            enum: ["active","block"],
            default:"active"

        },
      
        is_featured:{
            type:String,
            enum: ["yes","no"],
            default:"no"

        },
        content:{
            type:String,
        }

},
{
    timestamps: true
}
)

const Blog = mongoose.model("Blog",blogSchema)

export default Blog