import bcrypt from 'bcrypt'

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
  } catch (error) {
    throw new Error('Error hashing password' + error)
  }
}

const verifyPassword = async (
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
    return isMatch
  } catch (error) {
    throw new Error('Error verifying password' + error)
  }
}

export { hashPassword, verifyPassword }
