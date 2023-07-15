import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { getRepository, Repository } from 'typeorm'
import { ExpenseType } from '../entities/ExpenseType'
import { ICreateExpenseTypeDTO } from '@modules/expense/useCases/ExpenseType/dto/ICreateExpenseTypeDTO'

class ExpenseTypeRepository implements IExpenseTypeRepository {
  private repository: Repository<ExpenseType>

  constructor() {
    this.repository = getRepository(ExpenseType)
  }

  async create(data: ICreateExpenseTypeDTO): Promise<ExpenseType> {
    let expenseType = this.repository.create(data)

    expenseType = await this.repository.save(expenseType)

    return expenseType
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async getAll(): Promise<ExpenseType[]> {
    return await this.repository.find()
  }

  async getById(id: string): Promise<ExpenseType> {
    return await this.repository.findOne({ where: { id } })
  }

  async getAllByUserId(userId: string): Promise<ExpenseType[]> {
    return await this.repository.find({
      where: { userId },
      order: { id: 'DESC' },
    })
  }
}

export { ExpenseTypeRepository }
