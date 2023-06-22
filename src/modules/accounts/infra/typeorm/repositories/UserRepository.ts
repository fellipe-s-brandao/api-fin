import { ICreateUserDTO } from '@modules/accounts/useCases/createUser/dtos/ICreateUserDTO'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { getRepository, Repository } from 'typeorm'
import { User } from '../entities/User'

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data)

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ username })
    return user
  }
}

export { UserRepository }
