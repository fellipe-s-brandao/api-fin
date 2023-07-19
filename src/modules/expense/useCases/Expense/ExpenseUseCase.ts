import { Expense } from '@modules/expense/infra/typeorm/entities/Expense'
import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import {
  IRequestListExpense,
  IResquestCreateExpense,
} from './Interfaces/IRequest'
import { IResponseListExpense } from './Interfaces/IResponse'

@injectable()
class ExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private expensesRepository: IExpenseRepository,

    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,

    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider,
  ) {}

  async createExpense(data: IResquestCreateExpense): Promise<Expense> {
    try {
      if (!data.name) {
        throw new AppError('Nome da despesa não foi informada!')
      }

      if (!data.description) {
        throw new AppError('Descrição não informada!')
      }

      if (!data.amountSpent) {
        throw new AppError('Valor despesa não informada!')
      }

      if (!data.expenseTypeId) {
        throw new AppError('Tipo de despesa não informada!')
      }

      if (!data.expenseTypeId) {
        throw new AppError('Data do despesa não informada!')
      }

      const expenseType = await this.expenseTypeRepository.getById(
        data.expenseTypeId,
      )

      if (!expenseType) {
        throw new AppError('Tipo de despesa não encontrada!', 401)
      }

      data.expenseDate = this.dayJsDateProvider.toDate(data.expenseDate)
      const expense = this.expensesRepository.create(data)

      if (!expense) {
        throw new AppError('Erro ao criar despesa!', 500)
      }

      return expense
    } catch (error) {
      throw new AppError('Ocorreu um erro aocriar nova despesa!', 500, error)
    }
  }

  async deleteExpense(id: string): Promise<void> {
    try {
      const expense = await this.expensesRepository.getById(id)

      if (!expense) {
        throw new AppError('Despesa não encontrada!', 404)
      }

      await this.expensesRepository.delete(id)
    } catch (error) {
      throw new AppError('Ocorreu um erro ao deeletar a despesa!', 500, error)
    }
  }

  async listExpense(
    userId: string,
    filters: IRequestListExpense,
  ): Promise<IResponseListExpense> {
    try {
      if (filters.name) {
        filters.name = filters.name.toUpperCase()
      }

      const expenses = await this.expensesRepository.getAllByUserIdAndFilters(
        userId,
        filters,
      )

      const countExpenses = await this.expensesRepository.getCountAllByUserId(
        userId,
      )

      return { expenses, countExpenses }
    } catch (error) {
      throw new AppError('Ocorreu um erro ao buscar as despesas!', 500, error)
    }
  }

  async updateExpense(data: IResquestCreateExpense): Promise<Expense> {
    try {
      if (
        !data.name &&
        !data.description &&
        !data.amountSpent &&
        !data.expenseTypeId &&
        !data.expenseDate
      ) {
        throw new AppError('Nenhum dado fornecido para atualização!')
      }

      let expense = await this.expensesRepository.getById(data.id)

      if (!expense) {
        throw new AppError('Despesa não encontrada', 404)
      }

      data.expenseDate = this.dayJsDateProvider.toDate(data.expenseDate)
      expense = Object.assign(expense, data)

      return await this.expensesRepository.create(expense)
    } catch (error) {
      throw new AppError('Ocorreu um erro ao atualizar a despesa!', 500, error)
    }
  }

  async listExpenseById(id: string): Promise<Expense> {
    try {
      if (!id) {
        throw new AppError('Id da Despesa não informada!')
      }

      const expense = await this.expensesRepository.getById(id)

      if (!expense) {
        throw new AppError('Despesa não encontrada!', 404)
      }

      return expense
    } catch (error) {
      throw new AppError('Ocorreu um erro ao buscar a despesa!', 500, error)
    }
  }
}

export { ExpenseUseCase }
