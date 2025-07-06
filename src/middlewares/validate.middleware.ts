import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny } from 'zod'

const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({
        success: false,
        errors: result.error.flatten().fieldErrors,
      })
      return
    }

    req.body = result.data
    next()
  }

export default validate
