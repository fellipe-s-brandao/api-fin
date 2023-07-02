import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { getRepository, Repository } from 'typeorm'
import { Expense } from '../entities/Expense'
import { QueryError } from '@shared/errors/QueryError'
import { ICreateExpenseDTO } from '@modules/expense/useCases/Expense/dto/ICreateExpenseDTO'

class ExpenseRepository implements IExpenseRepository {
  private repository: Repository<Expense>

  constructor() {
    this.repository = getRepository(Expense)
  }

  async create(data: ICreateExpenseDTO): Promise<Expense> {
    try {
      let expense = this.repository.create(data)

      expense = await this.repository.save(expense)

      return expense
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getAllByUserId(userId: string): Promise<Expense[]> {
    try {
      return await this.repository
        .createQueryBuilder('expense')
        .innerJoinAndSelect('expense.expenseType', 'expenseType')
        .where('expense.userId = :userId', { userId })
        .getMany()
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getById(id: string): Promise<Expense> {
    try {
      return await this.repository.findOne({ where: { id } })
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getByExpenseTypeId(expenseTypeId: string): Promise<Expense[]> {
    try {
      return await this.repository.find({ where: { expenseTypeId } })
    } catch (error) {
      throw new QueryError(error)
    }
  }
}

export { ExpenseRepository }
