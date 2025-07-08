import { Request, Response } from 'express'
import { successResponse, errorResponse } from '@/utils/ApiResponse.util'
import ENV from '@/config/env.config'
import {
  loginUserService,
  refreshTokenService,
  registerUserService,
} from '@/services/auth.service'
import { MessageResponse, NODE_ENV, StatusCode } from '@/constants/constant'

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    const data = await registerUserService(name, email, password)
    return successResponse(
      res,
      data,
      MessageResponse.REGISTER_SUCCESS,
      StatusCode.CREATED
    )
  } catch (error) {
    return errorResponse(
      res,
      error,
      MessageResponse.REGISTER_FAILED,
      StatusCode.BAD_REQUEST
    )
  }
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const { accessToken, refreshToken } = await loginUserService(
      email,
      password
    )

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === NODE_ENV.PRODUCTION,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return successResponse(
      res,
      { accessToken, refreshToken },
      MessageResponse.LOGIN_SUCCESS
    )
  } catch (error) {
    return errorResponse(
      res,
      error,
      MessageResponse.LOGIN_FAILED,
      StatusCode.UNAUTHORIZED
    )
  }
}

const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      return errorResponse(
        res,
        new Error(MessageResponse.REFRESH_TOKEN_NOT_FOUND),
        MessageResponse.UNAUTHORIZED,
        StatusCode.UNAUTHORIZED
      )
    }
    const accessToken = refreshTokenService(refreshToken)
    return successResponse(
      res,
      { accessToken },
      MessageResponse.REFRESH_SUCCESS
    )
  } catch (error) {
    return errorResponse(
      res,
      error,
      MessageResponse.REFRESH_FAILED,
      StatusCode.INTERNAL_SERVER_ERROR
    )
  }
}

const logoutUser = async (_: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: ENV.NODE_ENV === NODE_ENV.PRODUCTION,
    sameSite: 'strict',
    maxAge: 0,
  })

  return successResponse(res, null, MessageResponse.LOGOUT_SUCCESS)
}

export { registerUser, loginUser, refreshToken, logoutUser }
