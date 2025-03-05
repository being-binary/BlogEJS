import express from 'express';
import isAuth from '../middleware/isAuth.js';
import {create_post, create_post_page, delete_post, delete_post_page, get_user_posts, update_post, update_post_page, view_post} from '../controllers/postControllers.js'
import partialAuth from '../middleware/partialAuth.js';
import checkToken from '../middleware/checkToken.js';
const router = express.Router()


router.post('/create', isAuth, checkToken, create_post)
router.get('/create', isAuth,create_post_page)

router.get('/uid=:id/allpost', get_user_posts)
router.get('/pid=:id', partialAuth, view_post)

router.get('/confirmdelete/:id',isAuth, checkToken, delete_post_page)
router.delete('/delete/:id',isAuth, checkToken, delete_post)

router.get('/updateform/:id',isAuth, checkToken, update_post_page)
router.put('/update/:id',isAuth, checkToken, update_post)

export default router