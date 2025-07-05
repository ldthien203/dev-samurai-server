import express from 'express'
import { registerUser, loginUser } from '../controllers/user.controller'
import getResponse from '../controllers/me.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/sign-up', registerUser)
router.post('/sign-in', loginUser)
router.get('/me', authMiddleware, getResponse)

export default router
