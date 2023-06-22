import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository'
import auth from '@config/auth'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization
    const userTokenRepository = new UserTokenRepository()

    if (!authHeader || authHeader === undefined) {
      throw new AppError('Token missing', 401)
    }

    const [, token] = authHeader.split(' ')

    const { sub: userId } = verify(token, auth.secretRefreshToken) as IPayload

    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      userId,
      token,
    )

    if (!user) {
      throw new AppError('User does not exists', 401)
    }

    request.user = {
      id: userId,
    }

    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }
}
