import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { getRepository, Repository } from 'typeorm'
import { Expense } from '../entities/Expense'
import { ICreateExpensesDTO } from '@modules/expenses/useCases/Expenses/createExpenses/dto/ICreateExpensesDTO'
import { QueryError } from '@shared/errors/QueryError'

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expense>

  constructor() {
    this.repository = getRepository(Expense)
  }

  async create(data: ICreateExpensesDTO): Promise<Expense> {
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
      return await this.repository.find({ where: { userId } })
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

export { ExpensesRepository }
