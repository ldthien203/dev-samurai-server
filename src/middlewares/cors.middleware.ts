import cors from 'cors'
import ENV from '@/config/env.config'

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
    callback(new Error('Not allowed by CORS'), false)
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
