import express from 'express'
import { registerUser, loginUser } from '../controllers/user.controller'

const router = express.Router()

router.post('/sign-up', registerUser)
router.post('/sign-in', loginUser)

export default router
