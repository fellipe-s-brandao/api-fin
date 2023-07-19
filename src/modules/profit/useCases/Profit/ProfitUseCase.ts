import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'
import { Profit } from '@modules/profit/infra/typeorm/entities/Profit'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import {
  IRequestListProfit,
  IResquestCreateProfit,
} from './interfaces/IRequest'
import { IResponseListProfit } from './interfaces/IResponse'
import { IGetTotalizersDTO } from './dto/ProfitDTO'

@injectable()
class ProfitUseCase {
  constructor(
    @inject('ProfitRepository')
    private profitRepository: IProfitRepository,

    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider,
  ) {}

  async createProfit(data: IResquestCreateProfit): Promise<Profit> {
    try {
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
    } catch (error) {
      throw new AppError('Ocorreu um erro ao criar novo lucro', 500, error)
    }
  }

  async deleteProfit(id: string): Promise<void> {
    try {
      const profit = await this.profitRepository.getById(id)

      if (!profit) {
        throw new AppError('Lucro não encontrado!', 404)
      }

      await this.profitRepository.delete(id)
    } catch (error) {
      throw new AppError('Ocorreu um erro ao deletar lucro', 500, error)
    }
  }

  async listProfit(
    userId: string,
    filters: IRequestListProfit,
  ): Promise<IResponseListProfit> {
    try {
      if (filters.name) {
        filters.name = filters.name.toUpperCase()
      }

      const profits = await this.profitRepository.getAllByUserIdAndFilters(
        userId,
        filters,
      )

      const countProfits = await this.profitRepository.getCountAllByUserId(
        userId,
      )

      return { profits, countProfits }
    } catch (error) {
      throw new AppError('Ocorreu um erro ao buscar lucros', 500, error)
    }
  }

  async listProfitById(id: string): Promise<Profit> {
    try {
      if (!id) {
        throw new AppError('Id do lucro não informado!')
      }

      const profit = await this.profitRepository.getById(id)

      if (!profit) {
        throw new AppError('Lucro não encontrado!', 404)
      }

      return profit
    } catch (error) {
      throw new AppError('Ocorreu um erro ao buscar lucro', 500, error)
    }
  }

  async updateProfit(data: IResquestCreateProfit): Promise<Profit> {
    try {
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
    } catch (error) {
      throw new AppError('Ocorreu um erro ao atualizar lucro', 500, error)
    }
  }

  async getTotalizers(userId: string): Promise<any> {
    // Buscar soma lucros - mes
    const month = this.dayJsDateProvider.dateNow().getMonth()
    let filters: IGetTotalizersDTO = { month }

    const monthTotalizers =
      this.profitRepository.getTotalizersByUserIdAndFilters(userId, filters)

    // Buscar soma lucros - semana
    const week = this.dayJsDateProvider.dateNow().getMonth()
    filters = { week }

    const weekTotalizers =
      this.profitRepository.getTotalizersByUserIdAndFilters(userId, filters)

    return {
      monthTotalizers,
      weekTotalizers,
    }
  }
}

export { ProfitUseCase }
