import { Profit } from '../infra/typeorm/entities/Profit'
import { ICreateProfitDTO } from '../useCases/Profit/createProfit/dto/ICreateProfitDTO'

interface IProfitRepository {
  create(data: ICreateProfitDTO): Promise<Profit>
  delete(id: string): Promise<void>
  getById(id: string): Promise<Profit>
  getAllByUserId(userId: string): Promise<Profit[]>
  getAllByProfitTypeId(profitTypeId: string): Promise<Profit[]>
}

export { IProfitRepository }
