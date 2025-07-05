import jwt from 'jsonwebtoken'
import ENV from '../config/env.config'

const generateAccessToken = (
  userId: { id: number; email: string },
  options?: jwt.SignOptions
) => {
  const payload = { id: userId }
  const secret = ENV.ACCESS_TOKEN_SECRET
  return jwt.sign(payload, secret, options)
}

const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw new Error('Token verification failed')
  }
}

export { generateAccessToken, verifyToken }
