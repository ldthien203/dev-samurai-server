import { Response } from 'express'

const successResponse = (
  res: Response,
  data: unknown,
  message: string = 'Request successful',
  statusCode: number = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

const errorResponse = (
  res: Response,
  error: unknown,
  message: string = 'Something went wrong',
  statusCode: number = 500
) => {
  console.error(error)
  res.status(statusCode).json({
    success: false,
    message,
    error,
  })
}

export { successResponse, errorResponse }
