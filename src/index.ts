import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 4000

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

app.get('/', async (req, res) => {
  res.send('Hello World')
})

console.log('Hello world')

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
