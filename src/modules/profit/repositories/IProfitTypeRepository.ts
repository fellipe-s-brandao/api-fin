import { ProfitType } from '../infra/typeorm/entities/ProfitType'
import { ICreateProfitTypeDTO } from '../useCases/ProfitType/createProfitType/dto/ICreateProfitTypeDTO'

interface IProfitTypeRepository {
  create(data: ICreateProfitTypeDTO): Promise<ProfitType>
  delete(id: string): Promise<void>
  getById(id: string): Promise<ProfitType>
  getAllByUserId(userId: string): Promise<ProfitType[]>
}

export { IProfitTypeRepository }
