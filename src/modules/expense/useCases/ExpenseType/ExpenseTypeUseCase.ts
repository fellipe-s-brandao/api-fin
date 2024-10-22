import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateExpenseTypeDTO } from './dto/ICreateExpenseTypeDTO'
import { ExpenseType } from '@modules/expense/infra/typeorm/entities/ExpenseType'
import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'

@injectable()
class ExpenseTypeUseCase {
  constructor(
    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,

    @inject('ExpenseRepository')
    private expensesRepository: IExpenseRepository,
  ) {}

  async createExpenseType(data: ICreateExpenseTypeDTO): Promise<ExpenseType> {
    try {
      if (!data.name) {
        throw new AppError('Nome do despesa não foi informada!')
      }

      if (!data.description) {
        throw new AppError('Descrição não informada!')
      }

      const expenseType = this.expenseTypeRepository.create(data)

      if (!expenseType) {
        throw new AppError('Erro ao criar novo tipo de despesa!', 500)
      }

      return expenseType
    } catch (error) {
      throw new AppError(
        'Ocorreu um erro ao criar novo tipo despesa!',
        500,
        error,
      )
    }
  }

  async deleteExpenseType(id: string): Promise<void> {
    try {
      const expenseType = await this.expenseTypeRepository.getById(id)

      if (!expenseType) {
        throw new AppError('Tipo de despesa não encontrada!', 404)
      }

      const expense = await this.expensesRepository.getByExpenseTypeId(id)

      if (expense.length > 0) {
        throw new AppError(
          'Tipo de despesa vinculada a um despesa, não é possível deletar!',
          400,
        )
      }

      await this.expenseTypeRepository.delete(id)
    } catch (error) {
      throw new AppError('Ocorreu um erro ao deletar tipo despesa!', 500, error)
    }
  }

  async listExpenseType(userId: string): Promise<ExpenseType[]> {
    try {
      return await this.expenseTypeRepository.getAllByUserId(userId)
    } catch (error) {
      throw new AppError(
        'Ocorreu um erro ao procurar tipo despesa!',
        500,
        error,
      )
    }
  }

  async updateExpenseType(data: ICreateExpenseTypeDTO): Promise<ExpenseType> {
    try {
      if (!data.name && !data.description) {
        throw new AppError(
          'Nenhum item fornecido para atualizar o tipo de despesa!',
        )
      }

      let expenseType = await this.expenseTypeRepository.getById(data.id)

      if (!expenseType) {
        throw new AppError('Tipo de despesa não encontrada!', 404)
      }

      expenseType = Object.assign(expenseType, data)

      return await this.expenseTypeRepository.create(expenseType)
    } catch (error) {
      throw new AppError(
        'Ocorreu um erro ao atualizar tipo despesa!',
        500,
        error,
      )
    }
  }

  async listExpenseTypeById(id: string): Promise<ExpenseType> {
    try {
      if (!id) {
        throw new AppError('Id do tipo de fespesa não informado!')
      }

      const expenseType = await this.expenseTypeRepository.getById(id)

      if (!expenseType) {
        throw new AppError('Tipo de despesa não encontrada!', 404)
      }

      return expenseType
    } catch (error) {
      throw new AppError('Ocorreu um erro ao listar tipo despesa!', 500, error)
    }
  }
}

export { ExpenseTypeUseCase }
