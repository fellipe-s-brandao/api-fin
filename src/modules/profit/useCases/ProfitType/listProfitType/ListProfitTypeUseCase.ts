import { ProfitType } from '@modules/profit/infra/typeorm/entities/ProfitType'
import { IProfitTypeRepository } from '@modules/profit/repositories/IProfitTypeRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListProfitTypeUseCase {
  constructor(
    @inject('ProfitTypeRepository')
    private profitTypeRepository: IProfitTypeRepository,
  ) {}

  async execute(userId: string): Promise<ProfitType[]> {
    return await this.profitTypeRepository.getAllByUserId(userId)
  }
}

export { ListProfitTypeUseCase }
