import { Profit } from '../infra/typeorm/entities/Profit'
import {
  ICreateProfitDTO,
  IGetTotalizersDTO,
  IListProfitDTO,
} from '../useCases/Profit/dto/ProfitDTO'

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
  getTotalizersByUserIdAndFilters(
    userId: string,
    filters: IGetTotalizersDTO,
  ): Promise<number>
}

export { IProfitRepository }
