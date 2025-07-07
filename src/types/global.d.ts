import { TJwtPayload } from './type'

declare global {
  namespace Express {
    interface Request {
      user?: TJwtPayload
    }
  }
}
