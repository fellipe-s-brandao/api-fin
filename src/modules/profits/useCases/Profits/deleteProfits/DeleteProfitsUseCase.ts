import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteProfitsUseCase {
  constructor(
    @inject('ExpenseTypesRepository')
    private expenseTypesRepository: IExpenseTypesRepository,

    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const expenseType = await this.expenseTypesRepository.getById(id)

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

    await this.expenseTypesRepository.delete(id)
  }
}

export { DeleteProfitsUseCase }
