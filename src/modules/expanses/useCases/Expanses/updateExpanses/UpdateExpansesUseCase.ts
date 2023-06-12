import { IExpensesRepository } from '@modules/expanses/repositories/IExpensesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateExpansesUseCase {
  constructor(
    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  async execute(): Promise<void> {}
}

export { UpdateExpansesUseCase }
