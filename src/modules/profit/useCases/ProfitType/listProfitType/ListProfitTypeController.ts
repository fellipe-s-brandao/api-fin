import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListExpenseTypeUseCase } from './ListExpenseTypeUseCase'

class ListProfitTypeController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listExpense = container.resolve(ListExpenseTypeUseCase)

    const expense = await listExpense.execute(userId)

    return response.status(200).json(expense)
  }
}

export { ListProfitTypeController }
