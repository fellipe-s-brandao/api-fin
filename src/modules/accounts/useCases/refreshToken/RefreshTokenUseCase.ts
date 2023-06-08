import auth from '@config/auth'
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refreshToken: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUserTokensRepository,

    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider,
  ) {}

  async execute(refreshToken: string): Promise<ITokenResponse> {
    const { sub, email } = verify(
      refreshToken,
      auth.secretRefreshToken,
    ) as IPayload

    const userId = sub

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        refreshToken,
      )

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!')
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const newRefreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: sub,
      expiresIn: auth.expiresInRefreshToken,
    })

    const refreshTokenExpiresDate = this.dayJsDateProvider.addDays(
      auth.expiresInRefreshTokenDays,
    )

    await this.usersTokensRepository.create({
      userId: sub,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    })

    const newToken = sign({}, auth.secretToken, {
      subject: userId,
      expiresIn: auth.expiresInToken,
    })

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    }
  }
}

export { RefreshTokenUseCase }
