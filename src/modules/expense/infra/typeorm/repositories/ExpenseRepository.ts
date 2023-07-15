import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { getRepository, Repository } from 'typeorm'
import { Expense } from '../entities/Expense'
import { ICreateExpenseDTO } from '@modules/expense/useCases/Expense/dto/ICreateExpenseDTO'
import { IListExpenseDTO } from '@modules/expense/useCases/Expense/dto/IListExpenseDTO'

class ExpenseRepository implements IExpenseRepository {
  private repository: Repository<Expense>

  constructor() {
    this.repository = getRepository(Expense)
  }

  async create(data: ICreateExpenseDTO): Promise<Expense> {
    let expense = this.repository.create(data)

    expense = await this.repository.save(expense)

    return expense
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async getAllByUserIdAndFilters(
    userId: string,
    filters: IListExpenseDTO,
  ): Promise<Expense[]> {
    const query = this.repository
      .createQueryBuilder('expense')
      .innerJoinAndSelect('expense.expenseType', 'expenseType')
      .where('expense.userId = :userId', { userId })
      .orderBy('expense.expenseDate', 'DESC')

    if (filters.name) {
      query.where('expense.name like :name', { name: `%${filters.name}%` })
    }

    if (filters.expenseDateStart) {
      query.where('expense.expenseDate >= :expenseDateStart', {
        expenseDateStart: `%${filters.expenseDateStart}%`,
      })
    }

    if (filters.expenseDateEnd) {
      query.where('expense.expenseDate >= :expenseDateEnd', {
        expenseDateEnd: `%${filters.expenseDateEnd}%`,
      })
    }

    if (filters.expenseTypeId) {
      query.where('expense.expenseTypeId = :expenseTypeId', {
        expenseTypeId: `${filters.expenseTypeId}`,
      })
    }

    return await query.getMany()
  }

  async getById(id: string): Promise<Expense> {
    return await this.repository.findOne({ where: { id } })
  }

  async getByExpenseTypeId(expenseTypeId: string): Promise<Expense[]> {
    return await this.repository.find({ where: { expenseTypeId } })
  }
}

export { ExpenseRepository }
