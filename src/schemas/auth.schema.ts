import { z } from 'zod'

const SchemaRequire = {
  NAME_REQUIRED: 'Name is required',
  NAME_MIN_LENGTH: 1,
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Invalid email address',
  EMAIL_MIN_LENGTH: 1,
  PASSWORD_SIGN_UP_MIN_LENGTH: 8,
  PASSWORD_SIGN_UP_REQUIRED: '8 or more characters',
  PASSWORD_SIGN_UP_UPPER_INCLUDE: 'Uppercase and lowercase letters',
  PASSWORD_SIGN_IN_MIN_LENGTH: 1,
  PASSWORD_SIGN_IN_REQUIRED: 'Password is required',
}

export const signUpSchema = z.object({
  name: z
    .string()
    .min(SchemaRequire.NAME_MIN_LENGTH, SchemaRequire.NAME_REQUIRED),
  email: z
    .string()
    .email(SchemaRequire.EMAIL_INVALID)
    .min(SchemaRequire.EMAIL_MIN_LENGTH, SchemaRequire.EMAIL_REQUIRED),
  password: z
    .string()
    .min(
      SchemaRequire.PASSWORD_SIGN_UP_MIN_LENGTH,
      SchemaRequire.PASSWORD_SIGN_UP_REQUIRED
    )
    .regex(/[A-Z]/, SchemaRequire.PASSWORD_SIGN_UP_UPPER_INCLUDE),
})

export const signInSchema = z.object({
  email: z
    .string()
    .email(SchemaRequire.EMAIL_INVALID)
    .min(SchemaRequire.EMAIL_MIN_LENGTH, SchemaRequire.EMAIL_REQUIRED),
  password: z
    .string()
    .min(
      SchemaRequire.PASSWORD_SIGN_IN_MIN_LENGTH,
      SchemaRequire.PASSWORD_SIGN_IN_REQUIRED
    ),
})
