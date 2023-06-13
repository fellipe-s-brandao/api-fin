import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { getRepository, Repository } from 'typeorm'
import { ExpenseType } from '../entities/ExpenseType'
import { ICreateExpensesDTO } from '@modules/expenses/useCases/Expenses/createExpenses/dto/ICreateExpensesDTO'
import { IUpdateExpansesDTO } from '@modules/expenses/useCases/Expenses/updateExpenses/dto/IUpdateExpansesDTO'
import { QueryError } from '@shared/errors/QueryError'

class ExpenseTypesRepository implements IExpenseTypesRepository {
  private repository: Repository<ExpenseType>

  constructor() {
    this.repository = getRepository(ExpenseType)
  }

  async create(data: ICreateExpensesDTO): Promise<void> {
    try {
      const expenseType = this.repository.create(data)
      await this.repository.save(expenseType)
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async update(data: IUpdateExpansesDTO, id: string): Promise<void> {
    try {
      await this.repository.update(id, data)
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
      return await this.repository.findOne(id)
    } catch (error) {
      throw new QueryError(error)
    }
  }
}

export { ExpenseTypesRepository }
