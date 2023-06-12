import { IExpenseTypesRepository } from '@modules/expanses/repositories/IExpenseTypesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListExpanseTypesUseCase {
  constructor(
    @inject('ExpenseTypesRepository')
    private expenseTypesRepository: IExpenseTypesRepository,
  ) {}

  async execute(): Promise<void> {}
}

export { ListExpanseTypesUseCase }
