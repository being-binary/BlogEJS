import express from "express";
import checkToken from '../middleware/checkToken.js'
import isAuth from '../middleware/isAuth.js'
import { delete_user, login_page, login_user, logout_user, register_page, register_user, update_user } from '../controllers/userControllers.js'
const router = express.Router()



router.post('/register', register_user)
router.get('/register', register_page)

router.post('/update',checkToken, isAuth, update_user)

router.post('/delete',checkToken, isAuth, delete_user)

router.post('/login', login_user)
router.get('/login', login_page)

router.post('/logout', logout_user)

export default router