import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { getRepository, Repository } from 'typeorm'
import { ExpenseType } from '../entities/ExpenseType'
import { QueryError } from '@shared/errors/QueryError'
import { ICreateExpenseTypeDTO } from '@modules/expense/useCases/ExpenseType/dto/ICreateExpenseTypeDTO'

class ExpenseTypeRepository implements IExpenseTypeRepository {
  private repository: Repository<ExpenseType>

  constructor() {
    this.repository = getRepository(ExpenseType)
  }

  async create(data: ICreateExpenseTypeDTO): Promise<ExpenseType> {
    try {
      let expenseType = this.repository.create(data)

      expenseType = await this.repository.save(expenseType)

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
      return await this.repository.find({
        where: { userId },
        order: { id: 'DESC' },
      })
    } catch (error) {
      throw new QueryError(error)
    }
  }
}

export { ExpenseTypeRepository }
