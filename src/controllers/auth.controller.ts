import { Request, Response } from 'express'
import { successResponse, errorResponse } from '@/utils/ApiResponse.util'

import ENV from '@/config/env.config'
import {
  loginUserService,
  refreshTokenService,
  registerUserService,
} from '@/services/auth.service'

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return errorResponse(
      res,
      new Error('Missing required fields'),
      'Please provide all required fields',
      400
    )
  }

  try {
    const data = await registerUserService(name, email, password)
    return successResponse(res, data, 'User registered successfully', 201)
  } catch (error) {
    return errorResponse(res, error, 'Registration failed')
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
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return successResponse(
      res,
      { accessToken, refreshToken },
      'Login successful'
    )
  } catch (error) {
    return errorResponse(res, error, 'Login failed')
  }
}

const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      return errorResponse(
        res,
        new Error('Refresh token not found'),
        'Unauthorized',
        401
      )
    }
    const accessToken = refreshTokenService(refreshToken)
    return successResponse(res, { accessToken }, 'Access token refreshed')
  } catch (error) {
    return errorResponse(res, error, 'Failed to refresh access token', 500)
  }
}

const logoutUser = async (_: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
  })

  return successResponse(res, null, 'Successfully logged out')
}

export { registerUser, loginUser, refreshToken, logoutUser }
