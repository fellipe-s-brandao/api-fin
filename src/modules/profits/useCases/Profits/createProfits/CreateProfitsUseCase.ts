import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateProfitsDTO } from './dto/ICreateProfitsDTO'
import { IProfitRepository } from '@modules/profits/repositories/IProfitRepository'
import { Profit } from '@modules/profits/infra/typeorm/entities/Profits'

@injectable()
class CreateProfitsUseCase {
  constructor(
    @inject('ProfitsRepository')
    private profitsRepository: IProfitRepository,
  ) {}

  async execute(data: ICreateProfitsDTO): Promise<Profit> {
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

    const profit = this.profitsRepository.create(data)

    if (!profit) {
      throw new AppError('Error creating profit', 500)
    }

    return profit
  }
}

export { CreateProfitsUseCase }
