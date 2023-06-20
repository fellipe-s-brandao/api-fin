import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListExpenseTypesUseCase } from './ListExpenseTypesUseCase'

class LisExpenseTypesController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listExpenses = container.resolve(ListExpenseTypesUseCase)

    const expenses = await listExpenses.execute(userId)

    return response.status(200).json(expenses)
  }
}

export { LisExpenseTypesController }
