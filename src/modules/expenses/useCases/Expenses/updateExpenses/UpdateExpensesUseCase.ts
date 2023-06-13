import { Expense } from '@modules/expenses/infra/typeorm/entities/Expense'
import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateExpensesDTO } from '../createExpenses/dto/ICreateExpensesDTO'

@injectable()
class UpdateExpensesUseCase {
  constructor(
    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  async execute(data: ICreateExpensesDTO): Promise<Expense> {
    if (
      !data.name &&
      !data.description &&
      !data.amountSpent &&
      !data.expenseTypeId &&
      !data.expenseDate
    ) {
      throw new AppError('No item was provided')
    }

    let expense = await this.expensesRepository.getById(data.id)

    if (!expense) {
      throw new AppError('Expense not found', 404)
    }

    expense = Object.assign(expense, data)
    console.log(expense)

    return await this.expensesRepository.create(expense)
  }
}

export { UpdateExpensesUseCase }
