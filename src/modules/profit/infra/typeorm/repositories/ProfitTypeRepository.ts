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
    let profitType = this.repository.create(data)

    profitType = await this.repository.save(profitType)

    return profitType
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async getAllByUserId(userId: string): Promise<ProfitType[]> {
    return await this.repository.find({
      where: { userId },
      order: { id: 'DESC' },
    })
  }

  async getById(id: string): Promise<ProfitType> {
    return await this.repository.findOne({ where: { id } })
  }
}

export { ProfitTypeRepository }
