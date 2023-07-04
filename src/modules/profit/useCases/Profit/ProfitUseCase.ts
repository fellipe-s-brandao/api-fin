import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateProfitDTO } from './dto/ICreateProfitDTO'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'
import { Profit } from '@modules/profit/infra/typeorm/entities/Profit'

@injectable()
class ProfitUseCase {
  constructor(
    @inject('ProfitRepository')
    private profitRepository: IProfitRepository,
  ) {}

  async createProfit(data: ICreateProfitDTO): Promise<Profit> {
    if (!data.name) {
      throw new AppError('Name is empty')
    }

    if (!data.description) {
      throw new AppError('Description is empty')
    }

    if (!data.profitAmount) {
      throw new AppError('Profit amount is invalid')
    }

    if (!data.profitTypeId) {
      throw new AppError('Profit type ID is empty')
    }

    if (!data.profitDate) {
      throw new AppError('Profit date is invalid')
    }

    const profit = this.profitRepository.create(data)

    if (!profit) {
      throw new AppError('Error creating profit', 500)
    }

    return profit
  }

  async deleteProfit(id: string): Promise<void> {
    const profit = await this.profitRepository.getById(id)

    if (!profit) {
      throw new AppError('Profit not found', 404)
    }

    await this.profitRepository.delete(id)
  }

  async listProfit(userId: string): Promise<Profit[]> {
    return await this.profitRepository.getAllByUserId(userId)
  }

  async updateProfit(data: ICreateProfitDTO): Promise<Profit> {
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

export { ProfitUseCase }
