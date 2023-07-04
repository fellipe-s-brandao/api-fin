import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateProfitTypeDTO } from './dto/ICreateProfitTypeDTO'
import { IProfitTypeRepository } from '@modules/profit/repositories/IProfitTypeRepository'
import { ProfitType } from '@modules/profit/infra/typeorm/entities/ProfitType'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'

@injectable()
class ProfitTypeUseCase {
  constructor(
    @inject('ProfitTypeRepository')
    private profitTypeRepository: IProfitTypeRepository,

    @inject('ProfitRepository')
    private profitRepository: IProfitRepository,
  ) {}

  async createProfitType(data: ICreateProfitTypeDTO): Promise<ProfitType> {
    if (!data.name) {
      throw new AppError('Name is empty')
    }

    if (!data.description) {
      throw new AppError('Description is empty')
    }

    const profitType = this.profitTypeRepository.create(data)

    if (!profitType) {
      throw new AppError('Error creating profit type', 500)
    }

    return profitType
  }

  async deleteProfitType(id: string): Promise<void> {
    const profitType = await this.profitTypeRepository.getById(id)

    if (!profitType) {
      throw new AppError('Profit Type not found', 404)
    }

    const expense = await this.profitRepository.getAllByProfitTypeId(id)

    if (expense.length > 0) {
      throw new AppError(
        'Type of profit linked to an profit, it is not possible to delete',
        400,
      )
    }

    await this.profitRepository.delete(id)
  }

  async listProfitType(userId: string): Promise<ProfitType[]> {
    return await this.profitTypeRepository.getAllByUserId(userId)
  }

  async updateProfitType(data: ICreateProfitTypeDTO): Promise<ProfitType> {
    if (!data.name && !data.description) {
      throw new AppError('No item was provided')
    }

    let profitType = await this.profitTypeRepository.getById(data.id)

    if (!profitType) {
      throw new AppError('Expense not found', 404)
    }

    profitType = Object.assign(profitType, data)

    return await this.profitTypeRepository.create(profitType)
  }
}

export { ProfitTypeUseCase }
