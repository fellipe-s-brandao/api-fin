import { Expense } from '@modules/expenses/infra/typeorm/entities/Expense'
import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListExpensesUseCase {
  constructor(
    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  async execute(userId: string): Promise<Expense[]> {
    return await this.expensesRepository.getAllByUserId(userId)
  }
}

export { ListExpensesUseCase }
