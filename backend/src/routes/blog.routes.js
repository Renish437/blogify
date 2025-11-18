import {Router} from 'express'
import { addComment, createBlog, deleteBlog, getBlogs, getComments, getFeaturedBlogs, getSingleBlog, getUserBlogs, updateBlog } from '../controllers/blog.controller.js'
import { verifyJWT } from '../middlewares/jwt.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()


router.route('/create').post(verifyJWT,upload.single("image"),createBlog)
router.route('/:id/update').put(verifyJWT,upload.single("image"),updateBlog)
router.route('/get-blogs').get(getBlogs)
router.route('/get-user-blogs').get(verifyJWT,getUserBlogs)
router.route('/:id/delete').delete(verifyJWT,deleteBlog)
router.route('/:id/get-blog').get(verifyJWT,getSingleBlog)
router.route('/:id/get-blog-front').get(getSingleBlog)
router.route('/get-featured-blogs').get(getFeaturedBlogs)
router.route('/add-comment').post(verifyJWT,addComment)
router.route('/get-comments/:blogId').get(getComments)

export default router