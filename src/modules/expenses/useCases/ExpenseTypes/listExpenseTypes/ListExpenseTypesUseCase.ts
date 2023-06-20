import { ExpenseType } from '@modules/expenses/infra/typeorm/entities/ExpenseType'
import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListExpenseTypesUseCase {
  constructor(
    @inject('ExpenseTypesRepository')
    private expenseTypesRepository: IExpenseTypesRepository,
  ) {}

  async execute(userId: string): Promise<ExpenseType[]> {
    return await this.expenseTypesRepository.getAllByUserId(userId)
  }
}

export { ListExpenseTypesUseCase }
