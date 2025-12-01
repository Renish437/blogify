import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

const optionalJWT = async(req,res,next)=>{
    try {
         const AuthHeader =req.header("Authorization")

        if(!AuthHeader){
            return next()
        }
        const token = req.header("Authorization")?.replace("Bearer ","")
   

         if(!token){
            return next()
        }
       
       
       const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
       const user = await User.findById(decodedToken?._id).select("-password")

       

        req.user = user;
        return next()

    } catch (error) {
           return next()
    }
}
export {optionalJWT}