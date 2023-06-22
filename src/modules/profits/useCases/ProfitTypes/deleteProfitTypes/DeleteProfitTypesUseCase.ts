import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteExpenseTypeUseCase {
  constructor(
    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,

    @inject('ExpenseRepository')
    private expensesRepository: IExpenseRepository,
  ) { }

  async execute(id: string): Promise<void> {
    const expenseType = await this.expenseTypeRepository.getById(id)

    if (!expenseType) {
      throw new AppError('Expense Type not found', 404)
    }

    const expense = await this.expensesRepository.getByExpenseTypeId(id)

    if (expense.length > 0) {
      throw new AppError(
        'Type of expense linked to an expense, it is not possible to delete',
        400,
      )
    }

    await this.expenseTypeRepository.delete(id)
  }
}

export { DeleteExpenseTypeUseCase }
