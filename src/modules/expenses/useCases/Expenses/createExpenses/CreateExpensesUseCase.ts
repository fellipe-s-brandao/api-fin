import { Expense } from '@modules/expenses/infra/typeorm/entities/Expense'
import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateExpensesDTO } from './dto/ICreateExpensesDTO'
import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'

@injectable()
class CreateExpensesUseCase {
  constructor(
    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,

    @inject('ExpenseTypesRepository')
    private expenseTypeRepository: IExpenseTypesRepository,
  ) {}

  async execute(data: ICreateExpensesDTO): Promise<Expense> {
    if (!data.name) {
      throw new AppError('Name is empty')
    }

    if (!data.description) {
      throw new AppError('Description is empty')
    }

    if (!data.amountSpent) {
      throw new AppError('Spent amount is empty')
    }

    if (!data.expenseTypeId) {
      throw new AppError('Expense type is empty')
    }

    if (!data.expenseTypeId) {
      throw new AppError('Expense date is empty')
    }

    const expenseType = await this.expenseTypeRepository.getById(
      data.expenseTypeId,
    )

    if (!expenseType) {
      throw new AppError('Expense type not found', 401)
    }

    const expense = this.expensesRepository.create(data)

    if (!expense) {
      throw new AppError('Rrror creating expense', 500)
    }

    return expense
  }
}

export { CreateExpensesUseCase }
