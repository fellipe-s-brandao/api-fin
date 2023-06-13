import { Expense } from '../infra/typeorm/entities/Expense'
import { ICreateExpensesDTO } from '../useCases/Expenses/createExpenses/dto/ICreateExpensesDTO'

interface IExpensesRepository {
  create(data: ICreateExpensesDTO): Promise<Expense>
  delete(id: string): Promise<void>
  getAllByUserId(userId: string): Promise<Expense[]>
  getById(id: string): Promise<Expense>
}

export { IExpensesRepository }
