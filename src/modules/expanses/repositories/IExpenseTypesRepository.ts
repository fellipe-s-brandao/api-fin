import { ICreateExpanseTypesDTO } from '../useCases/ExpanseTypes/dtos/ICreateExpanseTypesDTO'

interface IExpenseTypesRepository {
  create(data: ICreateExpanseTypesDTO): Promise<void>
}

export { IExpenseTypesRepository }
