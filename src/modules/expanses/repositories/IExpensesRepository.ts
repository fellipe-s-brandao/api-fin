import { Expanse } from '../infra/typeorm/entities/Expanse'
import { ICreateExpansesDTO } from '../useCases/Expanses/createExpanses/dto/ICreateExpansesDTO'
import { IUpdateExpansesDTO } from '../useCases/Expanses/updateExpanses/dto/IUpdateExpansesDTO'

interface IExpensesRepository {
  create(data: ICreateExpansesDTO): Promise<void>
  update(data: IUpdateExpansesDTO, id: string): Promise<void>
  delete(id: string): Promise<void>
  getAll(): Promise<Expanse[]>
  getById(id: string): Promise<Expanse>
}

export { IExpensesRepository }
