import { errorResponse } from '@/utils/ApiResponse.util'
import { verifyToken } from '@/utils/token.util'
import ENV from '@/config/env.config'
import { Request, Response, NextFunction } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return errorResponse(
      res,
      new Error('No token provided'),
      'Unauthorized',
      401
    )
  }

  try {
    const decoded = verifyToken(token, ENV.ACCESS_TOKEN_SECRET)

    if (!decoded) {
      return errorResponse(res, new Error('Invalid token'), 'Unauthorized', 401)
    }

    req.user = decoded

    next()
  } catch (error) {
    return errorResponse(res, error, 'Unauthorized', 401)
  }
}

export default authMiddleware
