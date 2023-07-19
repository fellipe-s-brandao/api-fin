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

    if (filters.name) {
      query.andWhere('UPPER(expense.name) like :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters.expenseDateStart) {
      query.andWhere('expense.expenseDate >= :expenseDateStart', {
        expenseDateStart: `%${filters.expenseDateStart}%`,
      })
    }

    if (filters.expenseDateEnd) {
      query.andWhere('expense.expenseDate <= :expenseDateEnd', {
        expenseDateEnd: `%${filters.expenseDateEnd}%`,
      })
    }

    if (filters.expenseTypeId) {
      query.andWhere('expense.expenseTypeId = :expenseTypeId', {
        expenseTypeId: `${filters.expenseTypeId}`,
      })
    }

    query.orderBy('expense.expenseDate', 'DESC')

    if (filters.offset && filters.limit) {
      const offset = parseInt(filters.offset)
      const limit = parseInt(filters.limit)
      query.skip(offset).take(limit)
    }

    return await query.getMany()
  }

  async getById(id: string): Promise<Expense> {
    return await this.repository.findOne({ where: { id } })
  }

  async getByExpenseTypeId(expenseTypeId: string): Promise<Expense[]> {
    return await this.repository.find({ where: { expenseTypeId } })
  }

  async getCountAllByUserId(userId: string): Promise<number> {
    return await this.repository
      .createQueryBuilder('expense')
      .where('expense.userId = :userId', { userId })
      .getCount()
  }
}

export { ExpenseRepository }
