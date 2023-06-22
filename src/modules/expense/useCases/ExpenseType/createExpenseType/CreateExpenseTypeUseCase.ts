import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateExpenseTypeDTO } from './dto/ICreateExpenseTypeDTO'
import { ExpenseType } from '@modules/expense/infra/typeorm/entities/ExpenseType'

@injectable()
class CreateExpenseTypeUseCase {
  constructor(
    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,
  ) {}

  async execute(data: ICreateExpenseTypeDTO): Promise<ExpenseType> {
    if (!data.name) {
      throw new AppError('Name is empty')
    }

    if (!data.description) {
      throw new AppError('Description is empty')
    }

    const expenseType = this.expenseTypeRepository.create(data)

    if (!expenseType) {
      throw new AppError('Error creating expense type', 500)
    }

    return expenseType
  }
}

export { CreateExpenseTypeUseCase }
