import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { getRepository, Repository } from 'typeorm'
import { Expense } from '../entities/Expense'
import { ICreateExpensesDTO } from '@modules/expenses/useCases/Expenses/createExpenses/dto/ICreateExpensesDTO'
import { IUpdateExpansesDTO } from '@modules/expenses/useCases/Expenses/updateExpenses/dto/IUpdateExpansesDTO'

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expense>

  constructor() {
    this.repository = getRepository(Expense)
  }

  async create(data: ICreateExpensesDTO): Promise<void> {
    const expense = this.repository.create(data)

    await this.repository.save(expense)
  }

  async update(data: IUpdateExpansesDTO, id: string): Promise<void> {
    await this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async getAll(): Promise<Expense[]> {
    return await this.repository.find()
  }

  async getById(id: string): Promise<Expense> {
    return await this.repository.findOne(id)
  }
}

export { ExpensesRepository }
