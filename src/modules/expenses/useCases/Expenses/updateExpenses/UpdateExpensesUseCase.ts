import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateExpensesUseCase {
  constructor(
    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  async execute(): Promise<void> {}
}

export { UpdateExpensesUseCase }
