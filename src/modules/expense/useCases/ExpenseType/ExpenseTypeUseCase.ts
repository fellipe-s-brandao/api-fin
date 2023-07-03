import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateExpenseTypeDTO } from './dto/ICreateExpenseTypeDTO'
import { ExpenseType } from '@modules/expense/infra/typeorm/entities/ExpenseType'
import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'

@injectable()
class ExpenseTypeUseCase {
  constructor(
    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,

    @inject('ExpenseRepository')
    private expensesRepository: IExpenseRepository,
  ) {}

  async createExpenseType(data: ICreateExpenseTypeDTO): Promise<ExpenseType> {
    if (!data.name) {
      throw new AppError('Name is empty')
    }

    if (!data.description) {
      throw new AppError('Description is empty')
    }

    const expenseType = this.expenseTypeRepository.create(data)

    if (!expenseType) {
      throw new AppError('Error creating expense type', 500)
    }

    return expenseType
  }

  async deleteExpenseType(id: string): Promise<void> {
    const expenseType = await this.expenseTypeRepository.getById(id)

    if (!expenseType) {
      throw new AppError('Expense Type not found', 404)
    }

    const expense = await this.expensesRepository.getByExpenseTypeId(id)

    if (expense.length > 0) {
      throw new AppError(
        'Type of expense linked to an expense, it is not possible to delete',
        400,
      )
    }

    await this.expenseTypeRepository.delete(id)
  }

  async listExpenseType(userId: string): Promise<ExpenseType[]> {
    return await this.expenseTypeRepository.getAllByUserId(userId)
  }

  async updateExpenseType(data: ICreateExpenseTypeDTO): Promise<ExpenseType> {
    if (!data.name && !data.description) {
      throw new AppError('No item was provided')
    }

    let expenseType = await this.expenseTypeRepository.getById(data.id)

    if (!expenseType) {
      throw new AppError('Expense not found', 404)
    }

    expenseType = Object.assign(expenseType, data)

    return await this.expenseTypeRepository.create(expenseType)
  }
}

export { ExpenseTypeUseCase }
