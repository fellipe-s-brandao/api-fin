import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateProfitDTO } from './dto/ICreateProfitDTO'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'
import { Profit } from '@modules/profit/infra/typeorm/entities/Profit'

@injectable()
class CreateProfitUseCase {
  constructor(
    @inject('ProfitRepository')
    private profitRepository: IProfitRepository,
  ) {}

  async execute(data: ICreateProfitDTO): Promise<Profit> {
    if (!data.name) {
      throw new AppError('Name is empty')
    }

    if (!data.description) {
      throw new AppError('Description is empty')
    }

    if (typeof data.profitAmount !== 'number') {
      throw new AppError('Profit amount is invalid')
    }

    if (!data.profitTypeId) {
      throw new AppError('Profit type ID is empty')
    }

    if (!(data.profitDate instanceof Date)) {
      throw new AppError('Profit date is invalid')
    }

    const profit = this.profitRepository.create(data)

    if (!profit) {
      throw new AppError('Error creating profit', 500)
    }

    return profit
  }
}

export { CreateProfitUseCase }
