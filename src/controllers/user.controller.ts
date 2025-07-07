import { Request, Response } from 'express'
import { successResponse, errorResponse } from '@/utils/ApiResponse.util'
import { ErrorMessage, MessageResponse, StatusCode } from '@/constants/constant'

const getResponse = (req: Request, res: Response) => {
  if (!req.user) {
    return errorResponse(
      res,
      new Error(ErrorMessage.USER_NOT_FOUND),
      MessageResponse.UNAUTHORIZED,
      StatusCode.UNAUTHORIZED
    )
  } else {
    return successResponse(
      res,
      { name: req.user.name, email: req.user.email },
      MessageResponse.API_SUCCESS,
      StatusCode.OK
    )
  }
}

export default getResponse
