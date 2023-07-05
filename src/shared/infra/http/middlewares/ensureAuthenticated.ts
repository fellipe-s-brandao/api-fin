import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
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

    if (!authHeader || authHeader === undefined) {
      throw new AppError('Token não informado!', 401)
    }

    const [, token] = authHeader.split(' ')

    const { sub: userId } = verify(token, auth.secretToken) as IPayload

    request.user = {
      id: userId,
    }

    next()
  } catch (error) {
    throw new AppError('Token inválido!', 401)
  }
}
