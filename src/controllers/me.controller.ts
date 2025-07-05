import { TRequest, TResponse } from '../types/type'

const getResponse = (req: TRequest, res: TResponse) => {
  res.status(200).json({
    success: true,
    message: 'API response successful',
  })
}

export default getResponse
