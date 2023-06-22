import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateProfitTypeDTO } from './dto/ICreateProfitTypeDTO'
import { ExpenseType } from '@modules/expense/infra/typeorm/entities/ExpenseType'

@injectable()
class CreateProfitTypeUseCase {
  constructor(
    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,
  ) {}

  async execute(data: ICreateProfitTypeDTO): Promise<ExpenseType> {
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

export { CreateProfitTypeUseCase }
