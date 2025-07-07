import { errorResponse } from '@/utils/ApiResponse.util'
import { verifyToken } from '@/utils/token.util'
import ENV from '@/config/env.config'
import { Request, Response, NextFunction } from 'express'
import { ErrorMessage, MessageResponse, StatusCode } from '@/constants/constant'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return errorResponse(
      res,
      new Error(ErrorMessage.NO_TOKEN_PROVIDED),
      MessageResponse.UNAUTHORIZED,
      StatusCode.UNAUTHORIZED
    )
  }

  try {
    const decoded = verifyToken(token, ENV.ACCESS_TOKEN_SECRET)

    if (!decoded) {
      return errorResponse(
        res,
        new Error(ErrorMessage.INVALID_TOKEN),
        MessageResponse.UNAUTHORIZED,
        StatusCode.UNAUTHORIZED
      )
    }

    req.user = decoded

    next()
  } catch (error) {
    return errorResponse(
      res,
      error,
      MessageResponse.UNAUTHORIZED,
      StatusCode.UNAUTHORIZED
    )
  }
}

export default authMiddleware
