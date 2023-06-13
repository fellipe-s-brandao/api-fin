import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteExpensesUseCase } from './DeleteExpensesUseCase'

class DeleteExpensesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteExpensesUseCase = container.resolve(DeleteExpensesUseCase)

    const expense = await deleteExpensesUseCase.execute(id)

    return response.status(204).json(expense)
  }
}

export { DeleteExpensesController }
