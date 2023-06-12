import { ICreateExpanseTypesDTO } from '../useCases/ExpanseTypes/createExpanseTypes/ICreateExpanseTypesDTO'

interface IExpenseTypesRepository {
  create(data: ICreateExpanseTypesDTO): Promise<void>
}

export { IExpenseTypesRepository }
