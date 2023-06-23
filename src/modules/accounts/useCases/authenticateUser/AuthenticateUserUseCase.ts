import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'
import auth from '@config/auth'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refreshToken: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)
    const {
      expiresInToken,
      secretRefreshToken,
      secretToken,
      expiresInRefreshToken,
      expiresInRefreshTokenDays,
    } = auth

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    })

    const existsUserToken = await this.userTokenRepository.findByUserId(user.id)

    if (existsUserToken) {
      await this.userTokenRepository.deleteById(existsUserToken.id)
    }

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    })

    const refreshTokenExpiresDate = this.dayJsDateProvider.addDays(
      expiresInRefreshTokenDays,
    )

    await this.userTokenRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    })

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    }
  }
}

export { AuthenticateUserUseCase }
