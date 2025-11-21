import { Router } from "express";
import { getUser, login, register, updatePassword, updateProfile, updateProfilePic } from "../controllers/user.controller.js";
import { verifyJWT } from '../middlewares/jwt.middleware.js'
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/update-profile").put(verifyJWT,updateProfile)
router.route("/update-profile-pic").put(verifyJWT,upload.single("image"),updateProfilePic)
router.route("/:id").get(verifyJWT,getUser)
router.route("/get-user").get(verifyJWT, getUser);
router.route("/update-password").put(verifyJWT, updatePassword);



export default router