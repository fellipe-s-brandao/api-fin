import { ExpenseType } from '../infra/typeorm/entities/ExpenseType'
import { ICreateExpenseTypeDTO } from '../useCases/ExpenseType/createExpenseType/dto/ICreateExpenseTypeDTO'

interface IExpenseTypeRepository {
  create(data: ICreateExpenseTypeDTO): Promise<ExpenseType>
  delete(id: string): Promise<void>
  getAll(): Promise<ExpenseType[]>
  getById(id: string): Promise<ExpenseType>
  getAllByUserId(userId: string): Promise<ExpenseType[]>
}

export { IExpenseTypeRepository }
