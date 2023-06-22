import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteExpenseUseCase } from './DeleteExpenseUseCase'

class DeleteExpenseController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteExpenseUseCase = container.resolve(DeleteExpenseUseCase)

    const expense = await deleteExpenseUseCase.execute(id)

    return response.status(204).json(expense)
  }
}

export { DeleteExpenseController }
