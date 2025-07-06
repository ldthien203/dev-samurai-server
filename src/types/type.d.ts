import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'

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
  REFRESH_TOKEN_SECRET: string
  CLIENT_DEV_DOMAIN: string
  CLIENT_PRODUCT_DOMAIN: string
}

export type TJwtPayload = {
  id: number
  name: string
  email: string
}
