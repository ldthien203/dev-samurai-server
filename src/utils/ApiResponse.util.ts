import { ErrorMessage, MessageResponse, StatusCode } from '@/constants/constant'
import { Response } from 'express'

const successResponse = (
  res: Response,
  data: unknown,
  message: string = MessageResponse.REQUEST_SUCCESS,
  statusCode: number = StatusCode.OK
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    statusCode,
  })
}

const errorResponse = (
  res: Response,
  error: unknown,
  message: string = ErrorMessage.SOMETHING_IS_WRONG,
  statusCode: number = StatusCode.INTERNAL_SERVER_ERROR
) => {
  console.error(error)
  res.status(statusCode).json({
    success: false,
    message,
    error,
    statusCode,
  })
}

export { successResponse, errorResponse }
