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
    let profit = this.repository.create(data)

    profit = await this.repository.save(profit)

    return profit
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async getAllByUserId(userId: string): Promise<Profit[]> {
    return await this.repository
      .createQueryBuilder('profit')
      .innerJoinAndSelect('profit.profitType', 'profitType')
      .where('profit.userId = :userId', { userId })
      .orderBy('profit.profitDate', 'DESC')
      .getMany()
  }

  async getById(id: string): Promise<Profit> {
    return await this.repository.findOne({ where: { id } })
  }

  async getAllByProfitTypeId(profitTypeId: string): Promise<Profit[]> {
    return await this.repository.find({ where: { profitTypeId } })
  }
}

export { ProfitRepository }
