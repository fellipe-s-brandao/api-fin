import { Expense } from '@modules/expense/infra/typeorm/entities/Expense'
import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private expensesRepository: IExpenseRepository,
  ) {}

  async execute(userId: string): Promise<Expense[]> {
    return await this.expensesRepository.getAllByUserId(userId)
  }
}

export { ListExpenseUseCase }
