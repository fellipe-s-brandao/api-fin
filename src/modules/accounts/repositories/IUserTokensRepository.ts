import { ICreateUserTokenDTO } from '../useCases/refreshToken/dtos/ICreateUserTokenDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

interface IUserTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokens>
  deleteById(id: string): Promise<void>
}

export { IUserTokensRepository }
