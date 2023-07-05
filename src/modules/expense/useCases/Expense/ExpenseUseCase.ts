import { Expense } from '@modules/expense/infra/typeorm/entities/Expense'
import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateExpenseDTO } from './dto/ICreateExpenseDTO'
import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'

@injectable()
class ExpenseUseCase {
  constructor(
    @inject('ExpenseRepository')
    private expensesRepository: IExpenseRepository,

    @inject('ExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,
  ) {}

  async createExpense(data: ICreateExpenseDTO): Promise<Expense> {
    if (!data.name) {
      throw new AppError('Nome do gasto não foi informado!')
    }

    if (!data.description) {
      throw new AppError('Descrição não informada!')
    }

    if (!data.amountSpent) {
      throw new AppError('Valor gasto não informado!')
    }

    if (!data.expenseTypeId) {
      throw new AppError('Tipo de gasto não informado!')
    }

    if (!data.expenseTypeId) {
      throw new AppError('Data do gasto não informado!')
    }

    const expenseType = await this.expenseTypeRepository.getById(
      data.expenseTypeId,
    )

    if (!expenseType) {
      throw new AppError('Tipo de gasto não encontrado!', 401)
    }

    const expense = this.expensesRepository.create(data)

    if (!expense) {
      throw new AppError('Erro ao criar gasto!', 500)
    }

    return expense
  }

  async deleteExpense(id: string): Promise<void> {
    const expense = await this.expensesRepository.getById(id)

    if (!expense) {
      throw new AppError('Gasto não encontrado!', 404)
    }

    await this.expensesRepository.delete(id)
  }

  async listExpense(userId: string): Promise<Expense[]> {
    return await this.expensesRepository.getAllByUserId(userId)
  }

  async updateExpense(data: ICreateExpenseDTO): Promise<Expense> {
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
      throw new AppError('Gasto não encontrado', 404)
    }

    expense = Object.assign(expense, data)

    return await this.expensesRepository.create(expense)
  }
}

export { ExpenseUseCase }
