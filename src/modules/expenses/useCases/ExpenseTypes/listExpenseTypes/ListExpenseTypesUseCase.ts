import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListExpenseTypesUseCase {
  constructor(
    @inject('ExpenseTypesRepository')
    private expenseTypesRepository: IExpenseTypesRepository,
  ) {}

  async execute(): Promise<void> {}
}

export { ListExpenseTypesUseCase }
