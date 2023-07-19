import { Repository, getRepository } from 'typeorm'
import { Profit } from '../entities/Profit'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'
import {
  ICreateProfitDTO,
  IListProfitDTO,
} from '@modules/profit/useCases/Profit/dto/ProfitDTO'

class ProfitRepository implements IProfitRepository {
  private repository: Repository<Profit>

  constructor() {
    this.repository = getRepository(Profit)
  }

  async create(data: ICreateProfitDTO): Promise<Profit> {
    let profit = this.repository.create(data)

    profit = await this.repository.save(profit)

    return profit
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async getAllByUserIdAndFilters(
    userId: string,
    filters: IListProfitDTO,
  ): Promise<Profit[]> {
    const query = this.repository
      .createQueryBuilder('profit')
      .innerJoinAndSelect('profit.profitType', 'profitType')
      .where('profit.userId = :userId', { userId })

    if (filters.name) {
      query.andWhere('UPPER(profit.name) like :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters.profitDateStart) {
      query.andWhere('profit.profitDate >= :profitDateStart', {
        profitDateStart: `%${filters.profitDateStart}%`,
      })
    }

    if (filters.profitDateEnd) {
      query.andWhere('profit.profitDate <= :profitDateEnd', {
        profitDateEnd: `%${filters.profitDateEnd}%`,
      })
    }

    if (filters.profitTypeId) {
      query.andWhere('profit.profitTypeId = :profitTypeId', {
        profitTypeId: `${filters.profitTypeId}`,
      })
    }

    query.orderBy('profit.profitDate', 'DESC')

    if (filters.offset && filters.limit) {
      const offset = parseInt(filters.offset)
      const limit = parseInt(filters.limit)
      query.skip(offset).take(limit)
    }

    return await query.getMany()
  }

  async getById(id: string): Promise<Profit> {
    return await this.repository.findOne({ where: { id } })
  }

  async getAllByProfitTypeId(profitTypeId: string): Promise<Profit[]> {
    return await this.repository.find({ where: { profitTypeId } })
  }

  async getCountAllByUserId(userId: string): Promise<number> {
    return await this.repository
      .createQueryBuilder('profit')
      .where('profit.userId = :userId', { userId })
      .getCount()
  }

  async getTotalizersByUserIdAndFilters(
    userId: string,
    filters: any,
  ): Promise<number> {
    const query = this.repository
      .createQueryBuilder('profit')
      .select('SUM(profit.profitAmount)', 'sum')
      .where('profit.userId = :userId', { userId })

    if (filters.week) {
      query.andWhere('WEEK(profit.profitDate) = :week', {
        week: `%${filters.week}%`,
      })
    }

    if (filters.month) {
      query.andWhere('MONTH(profit.profitDate) = :month', {
        month: `%${filters.month}%`,
      })
    }

    const result = await query.getRawOne()

    return result ? result.sum : 0
  }
}

export { ProfitRepository }
