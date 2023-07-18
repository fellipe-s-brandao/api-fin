import { Expense } from '../infra/typeorm/entities/Expense'
import { ICreateExpenseDTO } from '../useCases/Expense/dto/ICreateExpenseDTO'
import { IListExpenseDTO } from '../useCases/Expense/dto/IListExpenseDTO'

interface IExpenseRepository {
  create(data: ICreateExpenseDTO): Promise<Expense>
  delete(id: string): Promise<void>
  getAllByUserIdAndFilters(
    userId: string,
    filters: IListExpenseDTO,
  ): Promise<Expense[]>
  getCountAllByUserId(userId: string): Promise<number>
  getById(id: string): Promise<Expense>
  getByExpenseTypeId(expenseTypeId: string): Promise<Expense[]>
}

export { IExpenseRepository }
