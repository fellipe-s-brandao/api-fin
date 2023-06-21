import { QueryError } from '@shared/errors/QueryError'
import { Repository, getRepository } from 'typeorm'
import { ProfitTypes } from '../entities/ProfitTypes'
import { ICreateProfitTypesDTO } from '@modules/profits/useCases/ProfitTypes/createProfitTypes/dto/ICreateProfitTypesDTO'
import { IProfitTypesRepository } from '@modules/profits/repositories/IProfitTypesRepository'

class ProfitTypesRepository implements IProfitTypesRepository {
  private repository: Repository<ProfitTypes>

  constructor() {
    this.repository = getRepository(ProfitTypes)
  }

  async create(data: ICreateProfitTypesDTO): Promise<ProfitTypes> {
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

  async getAllByUserId(userId: string): Promise<ProfitTypes[]> {
    try {
      return await this.repository.find({ where: { userId } })
    } catch (error) {
      throw new QueryError(error)
    }
  }

  async getById(id: string): Promise<ProfitTypes> {
    try {
      return await this.repository.findOne({ where: { id } })
    } catch (error) {
      throw new QueryError(error)
    }
  }
}

export { ProfitTypesRepository }
