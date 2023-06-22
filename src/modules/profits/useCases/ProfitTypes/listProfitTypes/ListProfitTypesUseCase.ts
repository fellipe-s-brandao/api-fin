import { ExpenseType } from '@modules/expense/infra/typeorm/entities/ExpenseType'
import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListProfitTypesUseCase {
  constructor(
    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,
  ) { }

  async execute(userId: string): Promise<ExpenseType[]> {
    return await this.expenseTypeRepository.getAllByUserId(userId)
  }
}

export { ListProfitTypesUseCase }
