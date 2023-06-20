import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListExpensesUseCase } from './ListExpensesUseCase'

class ListExpensesController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listExpenses = container.resolve(ListExpensesUseCase)

    const expenses = await listExpenses.execute(userId)

    return response.status(200).json(expenses)
  }
}

export { ListExpensesController }
