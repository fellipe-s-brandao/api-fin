import { ICreateUserTokenDTO } from '../useCases/refreshToken/dtos/ICreateUserTokenDTO'
import { UserToken } from '../infra/typeorm/entities/UserToken'

interface IUserTokenRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken>
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken>
  deleteById(id: string): Promise<void>
  findByUserId(userId: string): Promise<UserToken>
}

export { IUserTokenRepository }
