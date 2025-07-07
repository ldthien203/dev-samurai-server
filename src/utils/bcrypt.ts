import { ErrorMessage } from '@/constants/constant'
import bcrypt from 'bcrypt'

const hashPassword = async (password: string): Promise<string> => {
  try {
    return bcrypt.hash(password, 10)
  } catch (error) {
    throw new Error(ErrorMessage.ERROR_HASHING_MESSAGE + error)
  }
}

const verifyPassword = async (
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  try {
    return bcrypt.compare(plainPassword, hashedPassword)
  } catch (error) {
    throw new Error(ErrorMessage.ERROR_VERIFICATION_MESSAGE + error)
  }
}

export { hashPassword, verifyPassword }
