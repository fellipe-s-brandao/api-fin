import { ICreateExpansesDTO } from '../useCases/createExpanses/dtos/ICreateExpansesDTO'

interface IExpensesRepository {
  create(data: ICreateExpansesDTO): Promise<void>
}

export { IExpensesRepository }
