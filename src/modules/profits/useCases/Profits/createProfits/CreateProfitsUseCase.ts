import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateExpenseTypesDTO } from './dto/ICreateExpenseTypesDTO'
import { ExpenseType } from '@modules/expenses/infra/typeorm/entities/ExpenseType'

@injectable()
class CreateProfitsUseCase {
  constructor(
    @inject('ExpenseTypesRepository')
    private expenseTypesRepository: IExpenseTypesRepository,
  ) {}

  async execute(data: ICreateExpenseTypesDTO): Promise<ExpenseType> {
    if (!data.name) {
      throw new AppError('Name is empty')
    }

    if (!data.description) {
      throw new AppError('Description is empty')
    }

    const expenseType = this.expenseTypesRepository.create(data)

    if (!expenseType) {
      throw new AppError('Error creating expense type', 500)
    }

    return expenseType
  }
}

export { CreateProfitsUseCase }
