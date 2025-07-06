import express from 'express'
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from '../controllers/user.controller'
import getResponse from '../controllers/me.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/auth/sign-up', registerUser)
router.post('/auth/sign-in', loginUser)
router.post('/auth/refresh-token', refreshToken)
router.post('/auth/logout', logoutUser)
router.get('/me', authMiddleware, getResponse)

export default router
