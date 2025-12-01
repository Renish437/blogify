import {Router} from 'express'
import { addComment, addToFavorite, createBlog, deleteBlog, getBlogs, getComments, getFavorites, getFeaturedBlogs, getSingleBlog, getUserBlogs, updateBlog } from '../controllers/blog.controller.js'
import { verifyJWT } from '../middlewares/jwt.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { optionalJWT } from '../middlewares/optionalJwt.middleware.js'

const router = Router()


router.route('/create').post(verifyJWT,upload.single("image"),createBlog)
router.route('/:id/update').put(verifyJWT,upload.single("image"),updateBlog)
router.route('/get-blogs').get(getBlogs)
router.route('/get-user-blogs').get(verifyJWT,getUserBlogs)
router.route('/:id/delete').delete(verifyJWT,deleteBlog)
router.route('/:id/get-blog').get(verifyJWT,getSingleBlog)
router.route('/:id/get-blog-front').get(optionalJWT,getSingleBlog)
router.route('/get-featured-blogs').get(getFeaturedBlogs)
router.route('/add-comment').post(verifyJWT,addComment)
router.route('/get-comments/:blogId').get(getComments)
router.route('/add-to-favorite').post(verifyJWT,addToFavorite)
router.route('/get-favorite-blogs').get(verifyJWT,getFavorites)

export default router