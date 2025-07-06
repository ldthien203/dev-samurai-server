import { Request, Response } from 'express'
// import { successResponse, errorResponse } from '@/utils/ApiResponse.util'

const getResponse = (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    })
  } else {
    res.status(200).json({
      success: true,
      message: 'API response successful',
      data: {
        name: req.user.name,
        email: req.user.email,
      },
    })
  }
  // if (!req.user) {
  //   return errorResponse(res, new Error('User not found'), 'Unauthorized', 401)
  // } else {
  //   return successResponse(res, req.user, 'API response successful', 200)
  // }
}

export default getResponse
