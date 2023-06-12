import { getRepository, Repository } from 'typeorm'
import { IExpensesRepository } from '@modules/expanses/repositories/IExpensesRepository'
import { ICreateExpanseTypesDTO } from '@modules/expanses/useCases/ExpanseTypesCreate/dtos/ICreateExpanseTypesDTO'
import { ExpanseTypes } from '../entities/ExpanseTypes'

class ExpenseTypesRepository implements IExpensesRepository {
  private repository: Repository<ExpanseTypes>

  constructor() {
    this.repository = getRepository(ExpanseTypes)
  }

  async create(data: ICreateExpanseTypesDTO): Promise<void> {
    const expanseType = this.repository.create(data)

    await this.repository.save(expanseType)
  }
}

export { ExpenseTypesRepository }
