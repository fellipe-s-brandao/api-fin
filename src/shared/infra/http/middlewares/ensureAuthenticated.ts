import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository'
import auth from '@config/auth'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization
  const usersTokensRepository = new UserTokensRepository()

  if (!authHeader) {
    new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')
  try {
    const { sub: userId } = verify(token, auth.secretRefreshToken) as IPayload

    const user = usersTokensRepository.findByUserIdAndRefreshToken(
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
