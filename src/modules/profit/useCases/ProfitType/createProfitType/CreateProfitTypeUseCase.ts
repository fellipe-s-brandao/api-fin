import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateProfitTypeDTO } from './dto/ICreateProfitTypeDTO'
import { IProfitTypeRepository } from '@modules/profit/repositories/IProfitTypeRepository'
import { ProfitType } from '@modules/profit/infra/typeorm/entities/ProfitType'

@injectable()
class CreateProfitTypeUseCase {
  constructor(
    @inject('ProfitTypeRepository')
    private profitTypeRepository: IProfitTypeRepository,
  ) {}

  async execute(data: ICreateProfitTypeDTO): Promise<ProfitType> {
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
}

export { CreateProfitTypeUseCase }
