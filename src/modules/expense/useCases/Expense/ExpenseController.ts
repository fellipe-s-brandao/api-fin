import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExpenseUseCase } from './ExpenseUseCase'

class ExpenseController {
  async createExpenseController(request: Request, response: Response) {
    const { name, description, amountSpent, expenseTypeId, expenseDate } =
      request.body

    const { id: userId } = request.user

    const expenseUseCase = container.resolve(ExpenseUseCase)

    const expense = await expenseUseCase.createExpense({
      name,
      description,
      amountSpent,
      expenseTypeId,
      expenseDate,
      userId,
    })

    return response.status(201).json(expense)
  }

  async deleteExpenseController(request: Request, response: Response) {
    const { id } = request.params

    const expenseUseCase = container.resolve(ExpenseUseCase)
    await expenseUseCase.deleteExpense(id)

    return response.status(204).json()
  }

  async listExpenseController(request: Request, response: Response) {
    const { id: userId } = request.user

    const expenseUseCase = container.resolve(ExpenseUseCase)
    const expenses = await expenseUseCase.listExpense(userId)

    return response.status(200).json(expenses)
  }

  async updateExpenseController(request: Request, response: Response) {
    const { name, description, amountSpent, expenseTypeId, expenseDate } =
      request.body

    const { id } = request.params
    const { id: userId } = request.user

    const expenseUseCase = container.resolve(ExpenseUseCase)
    const expense = await expenseUseCase.updateExpense({
      id,
      name,
      description,
      amountSpent,
      expenseTypeId,
      expenseDate,
      userId,
    })

    return response.status(200).json(expense)
  }

  async listExpenseByIdController(request: Request, response: Response) {
    const { id } = request.params

    const expenseUseCase = container.resolve(ExpenseUseCase)
    const expenses = await expenseUseCase.listExpenseById(id)

    return response.status(200).json(expenses)
  }
}

export { ExpenseController }
