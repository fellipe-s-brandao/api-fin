import { ICreateExpansesDTO } from '../useCases/ExpansesCreate/dtos/ICreateExpansesDTO'

interface IExpensesRepository {
  create(data: ICreateExpansesDTO): Promise<void>
}

export { IExpensesRepository }
