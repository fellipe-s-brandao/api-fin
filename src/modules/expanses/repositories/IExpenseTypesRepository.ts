import { ICreateExpanseTypesDTO } from '../useCases/ExpanseTypesCreate/dtos/ICreateExpanseTypesDTO'

interface IExpenseTypesRepository {
  create(data: ICreateExpanseTypesDTO): Promise<void>
}

export { IExpenseTypesRepository }
