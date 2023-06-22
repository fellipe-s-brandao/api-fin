import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IProfitTypeRepository } from '@modules/profit/repositories/IProfitTypeRepository'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'

@injectable()
class DeleteProfitTypeUseCase {
  constructor(
    @inject('ProfitTypeRepository')
    private profitTypeRepository: IProfitTypeRepository,

    @inject('ProfitRepository')
    private profitRepository: IProfitRepository,
  ) {}

  async execute(id: string): Promise<void> {
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
}

export { DeleteProfitTypeUseCase }
