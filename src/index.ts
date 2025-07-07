import app from './app'
import { AppDataSource } from '@/data-source'

import ENV from './config/env.config'

const startServer = async () => {
  try {
    await AppDataSource.initialize()
    console.log('Database connection established successfully!')

    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`)
    })
  } catch (error) {
    console.error('Error during application startup:', error)
    process.exit(1)
  }
}

startServer()
