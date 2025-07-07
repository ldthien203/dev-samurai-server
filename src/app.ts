import 'reflect-metadata'
import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from '@/routes/auth.routes'
import userRoutes from '@/routes/user.routes'
import corsMiddleware from '@/middlewares/cors.middleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(corsMiddleware)
app.use(express.static('public'))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.get('/', async (_, res) => {
  res.send('Hello World')
})

export default app
