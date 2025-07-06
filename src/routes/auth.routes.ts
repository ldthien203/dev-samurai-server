import express from 'express'
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from '../controllers/auth.controller'

const router = express.Router()

router.post('/sign-up', registerUser)
router.post('/sign-in', loginUser)
router.post('/refresh-token', refreshToken)
router.post('/logout', logoutUser)

export default router
