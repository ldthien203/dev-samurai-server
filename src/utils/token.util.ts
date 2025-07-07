import jwt from 'jsonwebtoken'
import { TJwtPayload } from '@/types/type'
import ENV from '@/config/env.config'
import { ErrorMessage } from '@/constants/constant'

const generateAccessToken = (user: TJwtPayload, options?: jwt.SignOptions) => {
  const payload = { id: user.id, name: user.name, email: user.email }
  const secret = ENV.ACCESS_TOKEN_SECRET
  return jwt.sign(payload, secret, options)
}

const generateRefreshToken = (user: TJwtPayload, options?: jwt.SignOptions) => {
  const payload = { id: user.id, name: user.name, email: user.email }
  const secret = ENV.REFRESH_TOKEN_SECRET
  return jwt.sign(payload, secret, options)
}

const verifyToken = (token: string, secret: string): TJwtPayload => {
  try {
    const decoded = jwt.verify(token, secret)

    if (
      typeof decoded === 'string' ||
      !decoded ||
      !('id' in decoded) ||
      !('email' in decoded)
    ) {
      throw new Error(ErrorMessage.INVALID_TOKEN_PAYLOAD)
    }

    return decoded as TJwtPayload
  } catch (error) {
    throw new Error(ErrorMessage.TOKEN_VERIFICATION_FAILED)
  }
}

export { generateAccessToken, generateRefreshToken, verifyToken }
