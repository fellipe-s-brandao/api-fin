import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { inject, injectable } from 'tsyringe'
import { ICreateExpenseTypeDTO } from '../createExpenseType/dto/ICreateExpenseTypeDTO'
import { ExpenseType } from '@modules/expense/infra/typeorm/entities/ExpenseType'
import { AppError } from '@shared/errors/AppError'

@injectable()
class UpdateExpenseTypeUseCase {
  constructor(
    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,
  ) { }

  async execute(data: ICreateExpenseTypeDTO): Promise<ExpenseType> {
    if (!data.name && !data.description) {
      throw new AppError('No item was provided')
    }

    let expenseType = await this.expenseTypeRepository.getById(data.id)

    if (!expenseType) {
      throw new AppError('Expense not found', 404)
    }

    expenseType = Object.assign(expenseType, data)

    return await this.expenseTypeRepository.create(expenseType)
  }
}

export { UpdateExpenseTypeUseCase }
