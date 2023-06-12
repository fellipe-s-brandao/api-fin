import { getRepository, Repository } from 'typeorm'
import { Expanse } from '../entities/Expanse'
import { IExpensesRepository } from '@modules/expanses/repositories/IExpensesRepository'
import { ICreateExpansesDTO } from '@modules/expanses/useCases/Expanses/createExpanses/ICreateExpansesDTO'
import { IUpdateExpansesDTO } from '@modules/expanses/useCases/Expanses/updateExpanses/IUpdateExpansesDTO'

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expanse>

  constructor() {
    this.repository = getRepository(Expanse)
  }

  async create(data: ICreateExpansesDTO): Promise<void> {
    const expanse = this.repository.create(data)

    await this.repository.save(expanse)
  }

  async update(data: IUpdateExpansesDTO, id: string): Promise<void> {
    await this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async getAll(): Promise<Expanse[]> {
    return await this.repository.find()
  }

  async getById(id: string): Promise<Expanse> {
    return await this.repository.findOne(id)
  }
}

export { ExpensesRepository }
