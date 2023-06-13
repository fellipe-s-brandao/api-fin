import { Expense } from '../infra/typeorm/entities/Expense'
import { ICreateExpensesDTO } from '../useCases/Expenses/createExpenses/dto/ICreateExpensesDTO'
import { IUpdateExpansesDTO } from '../useCases/Expenses/updateExpenses/dto/IUpdateExpansesDTO'

interface IExpensesRepository {
  create(data: ICreateExpensesDTO): Promise<Expense>
  update(data: IUpdateExpansesDTO, id: string): Promise<void>
  delete(id: string): Promise<void>
  getAll(): Promise<Expense[]>
  getById(id: string): Promise<Expense>
}

export { IExpensesRepository }
