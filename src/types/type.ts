import { signInSchema, signUpSchema } from '@/schemas/auth.schema'
import { z } from 'zod'

declare global {
  namespace Express {
    interface Request {
      user?: TJwtPayload
    }
  }
}

export type TEnv = {
  NODE_ENV: string
  PORT: number
  DATABASE_USER: string
  DATABASE_HOST: string
  DATABASE_DATABASE: string
  DATABASE_PASSWORD: string
  DATABASE_PORT: number
  ACCESS_TOKEN_SECRET: string
  ACCESS_TOKEN_EXPIRE_TIME: number
  REFRESH_TOKEN_SECRET: string
  REFRESH_TOKEN_EXPIRE_TIME: number
  CLIENT_DEV_DOMAIN: string
  CLIENT_PRODUCT_DOMAIN: string
}

export type TJwtPayload = {
  id: number
  name: string
  email: string
}

export type TSignUpInput = z.infer<typeof signUpSchema>
export type TSignInInput = z.infer<typeof signInSchema>
