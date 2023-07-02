import { Expense } from '@modules/expense/infra/typeorm/entities/Expense'
import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateExpenseDTO } from './dto/ICreateExpenseDTO'
import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'

@injectable()
class ExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private expensesRepository: IExpenseRepository,

    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,
  ) {}

  async createExpense(data: ICreateExpenseDTO): Promise<Expense> {
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

  async deleteExpense(id: string): Promise<void> {
    const expense = await this.expensesRepository.getById(id)

    if (!expense) {
      throw new AppError('Expense not found', 404)
    }

    await this.expensesRepository.delete(id)
  }

  async listExpense(userId: string): Promise<Expense[]> {
    return await this.expensesRepository.getAllByUserId(userId)
  }

  async updateExpense(data: ICreateExpenseDTO): Promise<Expense> {
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

    return await this.expensesRepository.create(expense)
  }
}

export { ExpenseUseCase }
