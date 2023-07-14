import { QueryError } from '@shared/errors/QueryError'
import { Repository, getRepository } from 'typeorm'
import { Profit } from '../entities/Profit'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'
import { ICreateProfitDTO } from '@modules/profit/useCases/Profit/dto/ICreateProfitDTO'

class ProfitRepository implements IProfitRepository {
  private repository: Repository<Profit>

  constructor() {
    this.repository = getRepository(Profit)
  }

  async create(data: ICreateProfitDTO): Promise<Profit> {
    try {
      let profit = this.repository.create(data)

      profit = await this.repository.save(profit)

      return profit
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getAllByUserId(userId: string): Promise<Profit[]> {
    try {
      return await this.repository
        .createQueryBuilder('profit')
        .innerJoinAndSelect('profit.profitType', 'profitType')
        .where('profit.userId = :userId', { userId })
        .orderBy('profit.profitDate', 'DESC')
        .getMany()
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getById(id: string): Promise<Profit> {
    try {
      return await this.repository.findOne({ where: { id } })
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getAllByProfitTypeId(profitTypeId: string): Promise<Profit[]> {
    try {
      return await this.repository.find({ where: { profitTypeId } })
    } catch (error) {
      throw new QueryError(error)
    }
  }
}

export { ProfitRepository }
