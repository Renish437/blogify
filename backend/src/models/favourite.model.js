import mongoose, { Schema } from "mongoose";



const favSchema = new Schema(
    {
        blog:{
            type:Schema.Types.ObjectId,
            ref:"Blog"
        },
         user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },

    },
    {
        timestamps:true
    }
)

const Favorite = mongoose.model("Favorite",favSchema)

export default Favorite