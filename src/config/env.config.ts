import dotenv from 'dotenv'
import { TEnv } from '@/types/type'

dotenv.config()

const ENV: TEnv = {
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_USER: process.env.DATABASE_USER || '',
  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_DATABASE: process.env.DATABASE_DATABASE || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 5432,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
}

export default ENV
