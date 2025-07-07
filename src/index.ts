import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from '@/data-source'
import cookieParser from 'cookie-parser'
import authRoutes from '@/routes/auth.routes'
import userRoutes from '@/routes/user.routes'
import corsMiddleware from '@/middlewares/cors.middleware'

const app = express()
const PORT = 4000

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

const startServer = async () => {
  try {
    await AppDataSource.initialize()
    console.log('Database connection established successfully!')

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Error during application startup:', error)
    process.exit(1)
  }
}

startServer()
