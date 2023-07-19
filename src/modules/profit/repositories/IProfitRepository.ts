import { Profit } from '../infra/typeorm/entities/Profit'
import { ICreateProfitDTO } from '../useCases/Profit/dto/ICreateProfitDTO'
import { IListProfitDTO } from '../useCases/Profit/dto/IListProfitDTO'

interface IProfitRepository {
  create(data: ICreateProfitDTO): Promise<Profit>
  delete(id: string): Promise<void>
  getById(id: string): Promise<Profit>
  getAllByUserIdAndFilters(
    userId: string,
    filters: IListProfitDTO,
  ): Promise<Profit[]>
  getAllByProfitTypeId(profitTypeId: string): Promise<Profit[]>
  getCountAllByUserId(userId: string): Promise<number>
}

export { IProfitRepository }
