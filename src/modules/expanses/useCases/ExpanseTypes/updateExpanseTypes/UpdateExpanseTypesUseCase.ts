import { IExpenseTypesRepository } from '@modules/expanses/repositories/IExpenseTypesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateExpanseTypesUseCase {
  constructor(
    @inject('ExpenseTypesRepository')
    private expenseTypesRepository: IExpenseTypesRepository,
  ) {}

  async execute(): Promise<void> {}
}

export { UpdateExpanseTypesUseCase }
