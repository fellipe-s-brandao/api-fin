import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'

@injectable()
class DeleteProfitUseCase {
  constructor(
    @inject('ProfitRepository')
    private profitRepository: IProfitRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const profit = await this.profitRepository.getById(id)

    if (!profit) {
      throw new AppError('Profit not found', 404)
    }

    await this.profitRepository.delete(id)
  }
}

export { DeleteProfitUseCase }
