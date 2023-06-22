import auth from '@config/auth'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'
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
    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

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
      await this.userTokenRepository.findByUserIdAndRefreshToken(
        userId,
        refreshToken,
      )

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!')
    }

    await this.userTokenRepository.deleteById(userToken.id)

    const newRefreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: sub,
      expiresIn: auth.expiresInRefreshToken,
    })

    const refreshTokenExpiresDate = this.dayJsDateProvider.addDays(
      auth.expiresInRefreshTokenDays,
    )

    await this.userTokenRepository.create({
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
