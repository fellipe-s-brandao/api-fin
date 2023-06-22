import { ICreateUserTokenDTO } from '@modules/accounts/useCases/refreshToken/dtos/ICreateUserTokenDTO'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'
import { getRepository, Repository } from 'typeorm'
import { UserToken } from '../entities/UserToken'

class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      userId,
      refreshToken,
    })

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export { UserTokenRepository }
