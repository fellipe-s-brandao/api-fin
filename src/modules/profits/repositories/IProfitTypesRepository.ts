import { ProfitTypes } from '../infra/typeorm/entities/ProfitTypes'
import { ICreateProfitTypesDTO } from '../useCases/ProfitTypes/createProfitTypes/dto/ICreateProfitTypesDTO'

interface IProfitTypesRepository {
  create(data: ICreateProfitTypesDTO): Promise<ProfitTypes>
  delete(id: string): Promise<void>
  getById(id: string): Promise<ProfitTypes>
  getAllByUserId(userId: string): Promise<ProfitTypes[]>
}

export { IProfitTypesRepository }
