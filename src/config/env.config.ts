import dotenv from 'dotenv'
import { TEnv } from '@/types/type'

dotenv.config()

const ENV: TEnv = {
  NODE_ENV: process.env.NODE_ENV || '',
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_USER: process.env.DATABASE_USER || '',
  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_DATABASE: process.env.DATABASE_DATABASE || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 5432,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
  CLIENT_DEV_DOMAIN: process.env.CLIENT_DEV_DOMAIN || '',
  CLIENT_PRODUCT_DOMAIN: process.env.CLIENT_PRODUCT_DOMAIN || '',
}

export default ENV
