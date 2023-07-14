import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateProfitDTO } from './dto/ICreateProfitDTO'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'
import { Profit } from '@modules/profit/infra/typeorm/entities/Profit'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

@injectable()
class ProfitUseCase {
  constructor(
    @inject('ProfitRepository')
    private profitRepository: IProfitRepository,

    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider,
  ) {}

  async createProfit(data: ICreateProfitDTO): Promise<Profit> {
    if (!data.name) {
      throw new AppError('Nome do lucro não foi informado!')
    }

    if (!data.description) {
      throw new AppError('Descrição não informada!')
    }

    if (!data.profitAmount) {
      throw new AppError('Valor do lucro não informado!')
    }

    if (!data.profitTypeId) {
      throw new AppError('Tipo de lucro não informado!')
    }

    if (!data.profitDate) {
      throw new AppError('Data do lucro não informada!')
    }

    data.profitDate = this.dayJsDateProvider.toDate(data.profitDate)
    const profit = this.profitRepository.create(data)

    if (!profit) {
      throw new AppError('Erro ao criar novo lucro!', 500)
    }

    return profit
  }

  async deleteProfit(id: string): Promise<void> {
    const profit = await this.profitRepository.getById(id)

    if (!profit) {
      throw new AppError('Lucro não encontrado!', 404)
    }

    await this.profitRepository.delete(id)
  }

  async listProfit(userId: string): Promise<Profit[]> {
    return await this.profitRepository.getAllByUserId(userId)
  }

  async listProfitById(id: string): Promise<Profit> {
    if (!id) {
      throw new AppError('Id do lucro não informado!')
    }

    const profit = await this.profitRepository.getById(id)

    if (!profit) {
      throw new AppError('Lucro não encontrado!', 404)
    }

    return profit
  }

  async updateProfit(data: ICreateProfitDTO): Promise<Profit> {
    if (
      !data.name &&
      !data.description &&
      !data.profitAmount &&
      !data.profitTypeId &&
      !data.profitDate
    ) {
      throw new AppError('Nenhum item fornecido para atualizar o lucro!')
    }

    data.profitDate = this.dayJsDateProvider.toDate(data.profitDate)
    let profit = await this.profitRepository.getById(data.id)

    if (!profit) {
      throw new AppError('Lucro não encontrado!', 404)
    }

    profit = Object.assign(profit, data)

    return await this.profitRepository.create(profit)
  }
}

export { ProfitUseCase }
