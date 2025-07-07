import { Request, Response } from 'express'
import { successResponse, errorResponse } from '@/utils/ApiResponse.util'

const getResponse = (req: Request, res: Response) => {
  if (!req.user) {
    return errorResponse(res, new Error('User not found'), 'Unauthorized', 401)
  } else {
    return successResponse(
      res,
      { name: req.user.name, email: req.user.email },
      'API response successful',
      200
    )
  }
}

export default getResponse
