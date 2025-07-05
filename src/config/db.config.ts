import { Pool } from 'pg'
import ENV from './env.config'

const db = new Pool({
  user: ENV.DATABASE_USER,
  host: ENV.DATABASE_HOST,
  database: ENV.DATABASE_DATABASE,
  password: ENV.DATABASE_PASSWORD,
  port: ENV.DATABASE_PORT,
})

export default db
