import { JwtUseCase } from '@/use-cases/orgs/jwt-use-case'
import { Request, Response, NextFunction } from 'express'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'Token is required' })
  }

  try {
    JwtUseCase.verify(token)

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
