import { Expense } from '../infra/typeorm/entities/Expense'
import { ICreateExpenseDTO } from '../useCases/Expense/dto/ICreateExpenseDTO'

interface IExpenseRepository {
  create(data: ICreateExpenseDTO): Promise<Expense>
  delete(id: string): Promise<void>
  getAllByUserId(userId: string): Promise<Expense[]>
  getById(id: string): Promise<Expense>
  getByExpenseTypeId(expenseTypeId: string): Promise<Expense[]>
}

export { IExpenseRepository }
