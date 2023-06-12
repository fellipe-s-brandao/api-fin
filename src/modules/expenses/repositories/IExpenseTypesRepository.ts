import { ExpenseType } from '../infra/typeorm/entities/ExpenseType'
import { ICreateExpenseTypesDTO } from '../useCases/ExpenseTypes/createExpenseTypes/dto/ICreateExpenseTypesDTO'
import { IUpdateExpenseTypesDTO } from '../useCases/ExpenseTypes/updateExpenseTypes/dto/IUpdateExpenseTypesDTO'

interface IExpenseTypesRepository {
  create(data: ICreateExpenseTypesDTO): Promise<void>
  update(data: IUpdateExpenseTypesDTO, id: string): Promise<void>
  delete(id: string): Promise<void>
  getAll(): Promise<ExpenseType[]>
  getById(id: string): Promise<ExpenseType>
}

export { IExpenseTypesRepository }
