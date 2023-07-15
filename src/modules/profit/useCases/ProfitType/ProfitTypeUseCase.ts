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
    try {
      if (!data.name) {
        throw new AppError('Nome do tipo de lucro não foi informado!')
      }

      if (!data.description) {
        throw new AppError('Descrição não informada!')
      }

      const profitType = this.profitTypeRepository.create(data)

      if (!profitType) {
        throw new AppError('Erro ao criar novo tipo de lucro!', 500)
      }

      return profitType
    } catch (error) {
      throw new AppError(
        'Ocorreu um erro ao criar novo tipo de lucro',
        500,
        error,
      )
    }
  }

  async deleteProfitType(id: string): Promise<void> {
    try {
      const profitType = await this.profitTypeRepository.getById(id)

      if (!profitType) {
        throw new AppError('Tipo de lucro não encontrado!', 404)
      }

      const profit = await this.profitRepository.getAllByProfitTypeId(id)

      if (profit.length > 0) {
        throw new AppError(
          'Tipo de lucro vinculado a um lucro, não é possível deletar',
          400,
        )
      }

      await this.profitTypeRepository.delete(id)
    } catch (error) {
      throw new AppError('Ocorreu um erro ao deletar tipo de lucro', 500, error)
    }
  }

  async listProfitType(userId: string): Promise<ProfitType[]> {
    try {
      return await this.profitTypeRepository.getAllByUserId(userId)
    } catch (error) {
      throw new AppError(
        'Ocorreu um erro ao buscar tipos de lucros',
        500,
        error,
      )
    }
  }

  async listProfitTypetById(id: string): Promise<ProfitType> {
    try {
      if (!id) {
        throw new AppError('Id do tipo de lucro não informado!')
      }

      const profitType = await this.profitTypeRepository.getById(id)

      if (!profitType) {
        throw new AppError('Tipo de lucro não encontrado!', 404)
      }

      return profitType
    } catch (error) {
      throw new AppError('Ocorreu um erro ao buscar tipo de lucro', 500, error)
    }
  }

  async updateProfitType(data: ICreateProfitTypeDTO): Promise<ProfitType> {
    try {
      if (!data.name && !data.description) {
        throw new AppError(
          'Nenhum item fornecido para atualizar o tipo de lucro!',
        )
      }

      let profitType = await this.profitTypeRepository.getById(data.id)

      if (!profitType) {
        throw new AppError('Tipo de lucro não encontrado!', 404)
      }

      profitType = Object.assign(profitType, data)

      return await this.profitTypeRepository.create(profitType)
    } catch (error) {
      throw new AppError(
        'Ocorreu um erro ao atualizar tipo de lucro',
        500,
        error,
      )
    }
  }
}

export { ProfitTypeUseCase }
