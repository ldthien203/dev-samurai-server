import express from 'express'

const app = express()
const PORT = 4000

app.get('/', async (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
