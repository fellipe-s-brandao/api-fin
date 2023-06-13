import { ExpenseType } from '../infra/typeorm/entities/ExpenseType'
import { ICreateExpenseTypesDTO } from '../useCases/ExpenseTypes/createExpenseTypes/dto/ICreateExpenseTypesDTO'

interface IExpenseTypesRepository {
  create(data: ICreateExpenseTypesDTO): Promise<void>
  delete(id: string): Promise<void>
  getAll(): Promise<ExpenseType[]>
  getById(id: string): Promise<ExpenseType>
}

export { IExpenseTypesRepository }
