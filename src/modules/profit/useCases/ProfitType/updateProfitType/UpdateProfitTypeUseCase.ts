import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { IProfitTypeRepository } from '@modules/profit/repositories/IProfitTypeRepository'
import { ICreateProfitTypeDTO } from '../createProfitType/dto/ICreateProfitTypeDTO'
import { ProfitType } from '@modules/profit/infra/typeorm/entities/ProfitType'

@injectable()
class UpdateProfitTypeUseCase {
  constructor(
    @inject('ProfitTypeRepository')
    private profitTypeRepository: IProfitTypeRepository,
  ) {}

  async execute(data: ICreateProfitTypeDTO): Promise<ProfitType> {
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

export { UpdateProfitTypeUseCase }
