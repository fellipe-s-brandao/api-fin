import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { inject, injectable } from 'tsyringe'
import { ICreateExpenseTypesDTO } from '../createExpenseTypes/dto/ICreateExpenseTypesDTO'
import { ExpenseType } from '@modules/expenses/infra/typeorm/entities/ExpenseType'
import { AppError } from '@shared/errors/AppError'

@injectable()
class UpdateExpenseTypesUseCase {
  constructor(
    @inject('ExpenseTypesRepository')
    private expenseTypesRepository: IExpenseTypesRepository,
  ) {}

  async execute(data: ICreateExpenseTypesDTO): Promise<ExpenseType> {
    if (!data.name && !data.description) {
      throw new AppError('No item was provided')
    }

    let expenseType = await this.expenseTypesRepository.getById(data.id)

    if (!expenseType) {
      throw new AppError('Expense not found', 404)
    }

    expenseType = Object.assign(expenseType, data)

    return await this.expenseTypesRepository.create(expenseType)
  }
}

export { UpdateExpenseTypesUseCase }
