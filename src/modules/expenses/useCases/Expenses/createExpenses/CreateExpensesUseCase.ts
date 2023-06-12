import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  description: string
  amountSpent: number
  expenseTypeId: string
  expenseDate: Date
  userId: string
}

@injectable()
class CreateExpensesUseCase {
  constructor(
    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  async execute(data: IRequest): Promise<void> {
    if (!data.name) {
      throw new AppError('Name is empty')
    }

    if (!data.description) {
      throw new AppError('Description is empty')
    }

    if (!data.amountSpent) {
      throw new AppError('Spent amount is empty')
    }

    if (!data.expenseTypeId) {
      throw new AppError('Expense type is empty')
    }
  }
}

export { CreateExpensesUseCase }
