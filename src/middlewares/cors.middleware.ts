import cors from 'cors'
import ENV from '@/config/env.config'
import { ErrorMessage } from '@/constants/constant'

const allowedOrigins: string[] = [
  ENV.CLIENT_DEV_DOMAIN,
  ENV.CLIENT_PRODUCT_DOMAIN,
]

const originFunction = (
  origin: string | undefined,
  callback: (err: Error | null, allowed?: boolean) => void
) => {
  if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
    callback(null, true)
  } else {
    callback(new Error(ErrorMessage.NOT_ALLOWED_BY_CORS), false)
  }
}

const corsOptions = {
  origin: originFunction,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

const corsMiddleware = cors(corsOptions)

export default corsMiddleware
