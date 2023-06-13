import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteExpensesUseCase {
  constructor(
    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const expense = await this.expensesRepository.getById(id)

    if (!expense) {
      throw new AppError('Expense not found', 404)
    }

    await this.expensesRepository.delete(id)
  }
}

export { DeleteExpensesUseCase }
