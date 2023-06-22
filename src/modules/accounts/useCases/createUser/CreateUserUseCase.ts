import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { AppError } from '@shared/errors/AppError'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { ICreateUserDTO } from '@modules/accounts/useCases/createUser/dtos/ICreateUserDTO'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const usernameAlreadyExists = await this.userRepository.findByEmail(
      data.email,
    )

    if (usernameAlreadyExists) {
      throw new AppError('UserName already exists')
    }

    const passwordHash = await hash(data.password, 8)

    await this.userRepository.create({
      name: data.name,
      username: data.username,
      email: data.email,
      password: passwordHash,
      birthDate: data.birthDate,
      gender: data.gender,
      phone: data.phone,
    })
  }
}

export { CreateUserUseCase }
