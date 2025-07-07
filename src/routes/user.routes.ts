import express from 'express'
import getResponse from '@/controllers/user.controller'
import authMiddleware from '@/middlewares/auth.middleware'
const router = express.Router()

router.get('/me', authMiddleware, getResponse)

export default router
