import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteExpenseTypesUseCase } from './DeleteExpenseTypesUseCase'

class DeleteExpenseTypesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteExpensesUseCase = container.resolve(DeleteExpenseTypesUseCase)

    const expense = await deleteExpensesUseCase.execute(id)

    return response.status(204).json(expense)
  }
}

export { DeleteExpenseTypesController }
