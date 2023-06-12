import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { getRepository, Repository } from 'typeorm'
import { ExpenseType } from '../entities/ExpenseType'
import { ICreateExpensesDTO } from '@modules/expenses/useCases/Expenses/createExpenses/dto/ICreateExpensesDTO'
import { IUpdateExpansesDTO } from '@modules/expenses/useCases/Expenses/updateExpenses/dto/IUpdateExpansesDTO'

class ExpenseTypesRepository implements IExpenseTypesRepository {
  private repository: Repository<ExpenseType>

  constructor() {
    this.repository = getRepository(ExpenseType)
  }

  async create(data: ICreateExpensesDTO): Promise<void> {
    const expenseType = this.repository.create(data)

    await this.repository.save(expenseType)
  }

  async update(data: IUpdateExpansesDTO, id: string): Promise<void> {
    await this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async getAll(): Promise<ExpenseType[]> {
    return await this.repository.find()
  }

  async getById(id: string): Promise<ExpenseType> {
    return await this.repository.findOne(id)
  }
}

export { ExpenseTypesRepository }
