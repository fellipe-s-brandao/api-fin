import { getRepository, Repository } from 'typeorm'
import { ExpanseType } from '../entities/ExpanseType'
import { IExpenseTypesRepository } from '@modules/expanses/repositories/IExpenseTypesRepository'
import { ICreateExpanseTypesDTO } from '@modules/expanses/useCases/ExpanseTypes/createExpanseTypes/dto/ICreateExpanseTypesDTO'
import { IUpdateExpanseTypesDTO } from '@modules/expanses/useCases/ExpanseTypes/updateExpanseTypes/dto/IUpdateExpanseTypesDTO'

class ExpenseTypesRepository implements IExpenseTypesRepository {
  private repository: Repository<ExpanseType>

  constructor() {
    this.repository = getRepository(ExpanseType)
  }

  async create(data: ICreateExpanseTypesDTO): Promise<void> {
    const expanseType = this.repository.create(data)

    await this.repository.save(expanseType)
  }

  async update(data: IUpdateExpanseTypesDTO, id: string): Promise<void> {
    await this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async getAll(): Promise<ExpanseType[]> {
    return await this.repository.find()
  }

  async getById(id: string): Promise<ExpanseType> {
    return await this.repository.findOne(id)
  }
}

export { ExpenseTypesRepository }
