import { env } from '@/env'
import jwt from 'jsonwebtoken'

interface JwtUseCaseInterface {
  email: string
  name: string
}

export class JwtUseCase {
  static sign(payload: JwtUseCaseInterface): string {
    const expireToken = Math.floor(Date.now() / 1000) + 60 * 60 * 24

    return jwt.sign({ payload }, env.JWT_SECRET, {
      expiresIn: expireToken,
    })
  }

  static verify(token: string) {
    return jwt.verify(token, env.JWT_SECRET)
  }
}
