import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateExpenseDTO } from '../createExpense/dto/ICreateExpenseDTO'
import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { Expense } from '@modules/expense/infra/typeorm/entities/Expense'

@injectable()
class UpdateExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private expensesRepository: IExpenseRepository,
  ) {}

  async execute(data: ICreateExpenseDTO): Promise<Expense> {
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

export { UpdateExpenseUseCase }
