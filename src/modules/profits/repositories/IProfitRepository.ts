import { Profit } from '../infra/typeorm/entities/Profits'
import { ICreateProfitsDTO } from '../useCases/Profits/createProfits/dto/ICreateProfitsDTO'

interface IProfitRepository {
  create(data: ICreateProfitsDTO): Promise<Profit>
  delete(id: string): Promise<void>
  getById(id: string): Promise<Profit>
  getAllByUserId(userId: string): Promise<Profit[]>
}

export { IProfitRepository }
