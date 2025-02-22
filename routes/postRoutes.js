import express from 'express';
import {create_post, create_post_page, get_user_posts} from '../controllers/postControllers.js'
const router = express.Router()


router.post('/create', create_post)
router.get('/create', create_post_page)


router.get('/uid=:id/allpost', get_user_posts)




export default router