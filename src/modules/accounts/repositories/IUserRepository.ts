import { ICreateUserDTO } from '../useCases/createUser/dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findByUsername(username: string): Promise<User>
  findById(id: string): Promise<User>
}

export { IUserRepository }
