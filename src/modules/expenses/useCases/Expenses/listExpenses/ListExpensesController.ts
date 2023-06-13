import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListExpansesUseCase } from './ListExpensesUseCase'

class ListExpensesController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listExpenses = container.resolve(ListExpansesUseCase)

    const expenses = await listExpenses.execute(userId)

    return response.status(200).json(expenses)
  }
}

export { ListExpensesController }
