import { ExpanseType } from '../infra/typeorm/entities/ExpanseType'
import { ICreateExpanseTypesDTO } from '../useCases/ExpanseTypes/createExpanseTypes/dto/ICreateExpanseTypesDTO'
import { IUpdateExpanseTypesDTO } from '../useCases/ExpanseTypes/updateExpanseTypes/dto/IUpdateExpanseTypesDTO'

interface IExpenseTypesRepository {
  create(data: ICreateExpanseTypesDTO): Promise<void>
  update(data: IUpdateExpanseTypesDTO, id: string): Promise<void>
  delete(id: string): Promise<void>
  getAll(): Promise<ExpanseType[]>
  getById(id: string): Promise<ExpanseType>
}

export { IExpenseTypesRepository }
