import { getRepository, Repository } from 'typeorm'
import { Expanses } from '../entities/Expanses'
import { IExpensesRepository } from '@modules/expanses/repositories/IExpensesRepository'
import { ICreateExpansesDTO } from '@modules/expanses/useCases/createExpanses/dtos/ICreateExpansesDTO'

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expanses>

  constructor() {
    this.repository = getRepository(Expanses)
  }

  async create(data: ICreateExpansesDTO): Promise<void> {
    const expanse = this.repository.create(data)

    await this.repository.save(expanse)
  }
}

export { ExpensesRepository }
