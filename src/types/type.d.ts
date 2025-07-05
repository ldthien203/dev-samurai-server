import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'

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
}

export type TRequest = Request
export type TResponse = Response
export type TNextFunction = NextFunction

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload
    }
  }
}
