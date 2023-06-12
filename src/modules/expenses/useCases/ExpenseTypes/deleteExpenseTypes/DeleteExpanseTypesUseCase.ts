import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteExpanseTypesUseCase {
  constructor(
    @inject('ExpenseTypesRepository')
    private expenseTypesRepository: IExpenseTypesRepository,
  ) {}

  async execute(): Promise<void> {}
}

export { DeleteExpanseTypesUseCase }
