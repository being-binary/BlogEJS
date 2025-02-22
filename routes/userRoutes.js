import express from "express";
import { delete_user, login_page, login_user, register_page, register_user, update_user } from '../controllers/userControllers.js'
const router = express.Router()



router.post('/register', register_user)
router.get('/register', register_page)

router.post('/update', update_user)

router.post('/delete', delete_user)

router.post('/login', login_user)
router.get('/login', login_page)


export default router