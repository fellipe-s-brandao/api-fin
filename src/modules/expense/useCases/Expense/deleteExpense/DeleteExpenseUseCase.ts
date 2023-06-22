import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private expensesRepository: IExpenseRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const expense = await this.expensesRepository.getById(id)

    if (!expense) {
      throw new AppError('Expense not found', 404)
    }

    await this.expensesRepository.delete(id)
  }
}

export { DeleteExpenseUseCase }
