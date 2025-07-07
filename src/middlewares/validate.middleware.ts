import { ErrorMessage, StatusCode } from '@/constants/constant'
import { errorResponse } from '@/utils/ApiResponse.util'
import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny } from 'zod'

const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const zodError = result.error.flatten().fieldErrors
      return errorResponse(
        res,
        zodError,
        ErrorMessage.VALIDATION_FAILED,
        StatusCode.BAD_REQUEST
      )
    }

    req.body = result.data
    next()
  }

export default validate
