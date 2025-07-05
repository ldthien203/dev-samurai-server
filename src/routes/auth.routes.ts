import express from 'express'
import {
  registerUser,
  loginUser,
  refreshToken,
} from '../controllers/user.controller'
import getResponse from '../controllers/me.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/sign-up', registerUser)
router.post('/sign-in', loginUser)
router.post('/refresh-token', refreshToken)
router.get('/me', authMiddleware, getResponse)

export default router
