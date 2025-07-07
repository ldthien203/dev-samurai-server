import { Request, Response } from 'express'
import { AppDataSource } from '@/data-source'
import { User } from '@/entity/User'
import { hashPassword, verifyPassword } from '@/utils/bcrypt'
import { successResponse, errorResponse } from '@/utils/ApiResponse.util'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '@/utils/token.util'
import ENV from '@/config/env.config'

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
    const existingUser = await AppDataSource.manager.findOneBy(User, {
      email: email,
    })

    if (existingUser) {
      return errorResponse(
        res,
        new Error('User already exists'),
        'Email is already registered',
        409
      )
    }

    const hashedPassword = await hashPassword(password)

    const user = new User()
    user.name = name
    user.email = email
    user.passwordHash = hashedPassword

    await AppDataSource.manager.save(user)

    return successResponse(
      res,
      { name, email },
      'User registered successfully',
      201
    )
  } catch (error) {
    return errorResponse(res, error, 'Registration failed')
  }
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await AppDataSource.manager.findOneBy(User, {
      email,
    })

    if (!user) {
      return errorResponse(
        res,
        new Error('User not found'),
        'Invalid credentials',
        401
      )
    }

    const isMatch = await verifyPassword(user.passwordHash, password)
    if (!isMatch) {
      return errorResponse(
        res,
        new Error('Password incorrect'),
        'Invalid credentials',
        401
      )
    }

    const payload = { id: user.id, name: user.name, email: user.email }
    const accessToken = generateAccessToken(payload, { expiresIn: '15m' })
    const refreshToken = generateRefreshToken(payload, { expiresIn: '7d' })

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

    const decoded = verifyToken(refreshToken, ENV.REFRESH_TOKEN_SECRET)

    const newAccessToken = generateAccessToken(decoded, { expiresIn: '15m' })

    return successResponse(
      res,
      { accessToken: newAccessToken },
      'Access token refreshed'
    )
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
