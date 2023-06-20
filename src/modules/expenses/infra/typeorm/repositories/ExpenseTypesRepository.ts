import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { getRepository, Repository } from 'typeorm'
import { ExpenseType } from '../entities/ExpenseType'
import { ICreateExpensesDTO } from '@modules/expenses/useCases/Expenses/createExpenses/dto/ICreateExpensesDTO'
import { QueryError } from '@shared/errors/QueryError'

class ExpenseTypesRepository implements IExpenseTypesRepository {
  private repository: Repository<ExpenseType>

  constructor() {
    this.repository = getRepository(ExpenseType)
  }

  async create(data: ICreateExpensesDTO): Promise<ExpenseType> {
    try {
      const expenseType = this.repository.create(data)

      await this.repository.save(expenseType)

      return expenseType
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

  async getAll(): Promise<ExpenseType[]> {
    try {
      return await this.repository.find()
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getById(id: string): Promise<ExpenseType> {
    try {
      return await this.repository.findOne({ where: { id } })
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getAllByUserId(userId: string): Promise<ExpenseType[]> {
    try {
      return await this.repository.find({ where: { userId } })
    } catch (error) {
      throw new QueryError(error)
    }
  }
}

export { ExpenseTypesRepository }
