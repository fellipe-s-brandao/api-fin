import { QueryError } from '@shared/errors/QueryError'
import { Repository, getRepository } from 'typeorm'
import { ProfitType } from '../entities/ProfitType'
import { IProfitTypeRepository } from '@modules/profit/repositories/IProfitTypeRepository'
import { ICreateProfitTypeDTO } from '@modules/profit/useCases/ProfitType/dto/ICreateProfitTypeDTO'

class ProfitTypeRepository implements IProfitTypeRepository {
  private repository: Repository<ProfitType>

  constructor() {
    this.repository = getRepository(ProfitType)
  }

  async create(data: ICreateProfitTypeDTO): Promise<ProfitType> {
    try {
      let profitType = this.repository.create(data)

      profitType = await this.repository.save(profitType)

      return profitType
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

  async getAllByUserId(userId: string): Promise<ProfitType[]> {
    try {
      return await this.repository.find({
        where: { userId },
        order: { id: 'DESC' },
      })
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getById(id: string): Promise<ProfitType> {
    try {
      return await this.repository.findOne({ where: { id } })
    } catch (error) {
      throw new QueryError(error)
    }
  }
}

export { ProfitTypeRepository }
