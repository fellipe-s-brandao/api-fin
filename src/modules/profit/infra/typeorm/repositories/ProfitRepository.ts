import { QueryError } from '@shared/errors/QueryError'
import { Repository, getRepository } from 'typeorm'
import { Profit } from '../entities/Profit'
import { ICreateProfitDTO } from '@modules/profit/useCases/Profit/createProfit/dto/ICreateProfitDTO'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'

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
      return await this.repository.find({ where: { userId } })
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
