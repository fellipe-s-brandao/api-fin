import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExpenseTypeUseCase } from './ExpenseTypeUseCase'

class ExpenseTypeController {
  async createExpenseTypeController(request: Request, response: Response) {
    const { name, description } = request.body

    const { id: userId } = request.user

    const expenseTypeUseCase = container.resolve(ExpenseTypeUseCase)

    const expense = await expenseTypeUseCase.createExpenseType({
      name,
      description,
      userId,
    })

    return response.status(201).json(expense)
  }

  async deleteExpenseTypeController(request: Request, response: Response) {
    const { id } = request.params

    const expenseTypeUseCase = container.resolve(ExpenseTypeUseCase)

    const expense = await expenseTypeUseCase.deleteExpenseType(id)

    return response.status(204).json(expense)
  }

  async listExpenseTypeController(request: Request, response: Response) {
    const { id: userId } = request.user

    const expenseTypeUseCase = container.resolve(ExpenseTypeUseCase)

    const expenseTypes = await expenseTypeUseCase.listExpenseType(userId)

    return response.status(200).json(expenseTypes)
  }

  async updateExpenseTypeController(request: Request, response: Response) {
    const { name, description } = request.body

    const { id } = request.params
    const { id: userId } = request.user

    const expenseTypeUseCase = container.resolve(ExpenseTypeUseCase)

    const expenseType = await expenseTypeUseCase.updateExpenseType({
      id,
      name,
      description,
      userId,
    })

    return response.status(200).json(expenseType)
  }

  async listExpenseTypeByIdController(request: Request, response: Response) {
    const { id } = request.params

    const expenseTypeUseCase = container.resolve(ExpenseTypeUseCase)
    const expenseType = await expenseTypeUseCase.listExpenseTypeById(id)

    return response.status(200).json(expenseType)
  }
}

export { ExpenseTypeController }
