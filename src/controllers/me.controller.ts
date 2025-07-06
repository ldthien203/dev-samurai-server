import { Request, Response } from 'express'

const getResponse = (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    })
  } else {
    res.status(200).json({
      success: true,
      message: 'API response successful',
      data: {
        name: req.user.name,
        email: req.user.email,
      },
    })
  }
}

export default getResponse
