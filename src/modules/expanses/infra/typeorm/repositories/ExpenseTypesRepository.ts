import { getRepository, Repository } from 'typeorm'
import { ICreateExpanseTypesDTO } from '@modules/expanses/useCases/ExpanseTypes/dtos/ICreateExpanseTypesDTO'
import { ExpanseType } from '../entities/ExpanseType'
import { IExpenseTypesRepository } from '@modules/expanses/repositories/IExpenseTypesRepository'

class ExpenseTypesRepository implements IExpenseTypesRepository {
  private repository: Repository<ExpanseType>

  constructor() {
    this.repository = getRepository(ExpanseType)
  }

  async create(data: ICreateExpanseTypesDTO): Promise<void> {
    const expanseType = this.repository.create(data)

    await this.repository.save(expanseType)
  }
}

export { ExpenseTypesRepository }
