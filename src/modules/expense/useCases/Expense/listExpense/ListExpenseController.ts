import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListExpenseUseCase } from './ListExpenseUseCase'

class ListExpenseController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listExpense = container.resolve(ListExpenseUseCase)

    const expense = await listExpense.execute(userId)

    return response.status(200).json(expense)
  }
}

export { ListExpenseController }
