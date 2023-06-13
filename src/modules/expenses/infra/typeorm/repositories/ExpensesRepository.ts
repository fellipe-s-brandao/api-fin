import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { getRepository, Repository } from 'typeorm'
import { Expense } from '../entities/Expense'
import { ICreateExpensesDTO } from '@modules/expenses/useCases/Expenses/createExpenses/dto/ICreateExpensesDTO'
import { IUpdateExpansesDTO } from '@modules/expenses/useCases/Expenses/updateExpenses/dto/IUpdateExpansesDTO'
import { QueryError } from '@shared/errors/QueryError'

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expense>

  constructor() {
    this.repository = getRepository(Expense)
  }

  async create(data: ICreateExpensesDTO): Promise<Expense> {
    try {
      const expense = this.repository.create(data)

      await this.repository.save(expense)

      return expense
    } catch (error) {
      throw new QueryError()
    }
  }

  async update(data: IUpdateExpansesDTO, id: string): Promise<void> {
    try {
      await this.repository.update(id, data)
    } catch (error) {
      throw new QueryError()
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new QueryError()
    }
  }

  async getAllByUserId(userId: string): Promise<Expense[]> {
    try {
      return await this.repository.find({ where: { userId } })
    } catch (error) {
      throw new QueryError()
    }
  }

  async getById(id: string): Promise<Expense> {
    try {
      return await this.repository.findOne(id)
    } catch (error) {
      throw new QueryError()
    }
  }
}

export { ExpensesRepository }
