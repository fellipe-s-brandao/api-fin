import { Expense } from '../infra/typeorm/entities/Expense'
import {
  ICreateExpenseDTO,
  IGetTotalizersDTO,
  IListExpenseDTO,
} from '../useCases/Expense/dto/ExpenseDTO'

interface IExpenseRepository {
  create(data: ICreateExpenseDTO): Promise<Expense>
  delete(id: string): Promise<void>
  getAllByUserIdAndFilters(
    userId: string,
    filters: IListExpenseDTO,
  ): Promise<Expense[]>
  getCountAllByUserId(
    userId: string,
    filters: IGetTotalizersDTO,
  ): Promise<number>
  getTotalizersByUserIdAndFilters(
    userId: string,
    filters: IGetTotalizersDTO,
  ): Promise<number>
  getById(id: string): Promise<Expense>
  getByExpenseTypeId(expenseTypeId: string): Promise<Expense[]>
}

export { IExpenseRepository }
