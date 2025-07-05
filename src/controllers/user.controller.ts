import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import { hashPassword } from '../utils/hashPassword.util'
import { successResponse, errorResponse } from '../utils/ApiResponse.util'

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
      200
    )
  } catch (error) {
    return errorResponse(res, error, 'Registration failed')
  }
}

const loginUser = () => {}

export { registerUser, loginUser }
