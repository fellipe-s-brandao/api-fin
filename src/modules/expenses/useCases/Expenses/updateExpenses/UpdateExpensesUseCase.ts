import { Expense } from '@modules/expenses/infra/typeorm/entities/Expense'
import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  name: string
  description: string
  amountSpent: number
  expenseTypeId: string
  expenseDate: Date
  userId: string
}

@injectable()
class UpdateExpensesUseCase {
  constructor(
    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  async execute(data: IRequest): Promise<Expense> {
    if (
      !data.name &&
      !data.description &&
      !data.amountSpent &&
      !data.expenseTypeId &&
      !data.expenseDate
    ) {
      throw new AppError('No item was provided')
    }

    const expense = await this.expensesRepository.getById(data.id)

    if (!expense) {
      throw new AppError('Expense not found', 404)
    }

    return await this.expensesRepository.create(data)
  }
}

export { UpdateExpensesUseCase }
