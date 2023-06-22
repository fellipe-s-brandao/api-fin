import { Profit } from '@modules/profit/infra/typeorm/entities/Profit'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListProfitUseCase {
  constructor(
    @inject('ProfitRepository')
    private profitRepository: IProfitRepository,
  ) {}

  async execute(userId: string): Promise<Profit[]> {
    return await this.profitRepository.getAllByUserId(userId)
  }
}

export { ListProfitUseCase }
