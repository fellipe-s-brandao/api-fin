import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'
import { ICreateProfitDTO } from '../createProfit/dto/ICreateProfitDTO'
import { Profit } from '@modules/profit/infra/typeorm/entities/Profit'

@injectable()
class UpdateProfitUseCase {
  constructor(
    @inject('ProfitRepository')
    private profitRepository: IProfitRepository,
  ) {}

  async execute(data: ICreateProfitDTO): Promise<Profit> {
    if (
      !data.name &&
      !data.description &&
      !data.profitAmount &&
      !data.profitTypeId &&
      !data.profitDate
    ) {
      throw new AppError('No item was provided')
    }

    let profit = await this.profitRepository.getById(data.id)

    if (!profit) {
      throw new AppError('Profit not found', 404)
    }

    profit = Object.assign(profit, data)

    return await this.profitRepository.create(profit)
  }
}

export { UpdateProfitUseCase }
