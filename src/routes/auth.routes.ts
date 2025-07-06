import express from 'express'
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from '../controllers/auth.controller'
import validate from '@/middlewares/validate.middleware'
import { signUpSchema, signInSchema } from '@/schemas/auth.schema'

const router = express.Router()

router.post('/sign-up', validate(signUpSchema), registerUser)
router.post('/sign-in', validate(signInSchema), loginUser)
router.post('/refresh-token', refreshToken)
router.post('/logout', logoutUser)

export default router
