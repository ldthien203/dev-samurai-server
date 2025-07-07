import { AppDataSource } from '@/data-source'
import { User } from '@/entity/User'
import { hashPassword, verifyPassword } from '@/utils/bcrypt'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '@/utils/token.util'
import ENV from '@/config/env.config'

const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await AppDataSource.manager.findOneBy(User, { email })

  if (existingUser) throw new Error('User already exists')

  const hashedPassword = await hashPassword(password)

  const user = new User()
  user.name = name
  user.email = email
  user.passwordHash = hashedPassword

  await AppDataSource.manager.save(user)

  return { name, email }
}

const loginUserService = async (email: string, password: string) => {
  const user = await AppDataSource.manager.findOneBy(User, {
    email,
  })

  if (!user) throw new Error('User not found')

  const isMatch = await verifyPassword(user.passwordHash, password)

  if (!isMatch) throw new Error('Password incorrect')

  const payload = { id: user.id, name: user.name, email: user.email }

  const accessToken = generateAccessToken(payload, { expiresIn: '15m' })
  const refreshToken = generateRefreshToken(payload, { expiresIn: '7d' })

  return { accessToken, refreshToken }
}

const refreshTokenService = (refreshToken: string) => {
  const decoded = verifyToken(refreshToken, ENV.REFRESH_TOKEN_SECRET)

  const newAccessToken = generateAccessToken(decoded, { expiresIn: '15m' })

  return newAccessToken
}

export { registerUserService, loginUserService, refreshTokenService }
