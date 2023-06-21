import { ProfitTypes } from '../infra/typeorm/entities/ProfitTypes'
import { ICreateProfitTypesDTO } from '../useCases/ProfitTypes/createProfitTypes/dto/ICreateProfitTypesDTO'

interface IProfitsRepository {
  create(data: ICreateProfitTypesDTO): Promise<ProfitTypes>
  delete(id: string): Promise<void>
  getById(id: string): Promise<ProfitTypes>
  getAllByUserId(userId: string): Promise<ProfitTypes[]>
}

export { IProfitsRepository }
