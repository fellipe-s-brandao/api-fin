import { ICreateUserTokenDTO } from '@modules/accounts/useCases/refreshToken/dtos/ICreateUserTokenDTO'
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository'
import { getRepository, Repository } from 'typeorm'
import { UserTokens } from '../entities/UserTokens'

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
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
  ): Promise<UserTokens> {
    const usersToken = await this.repository.findOne({
      userId,
      refreshToken,
    })

    return usersToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export { UserTokensRepository }
