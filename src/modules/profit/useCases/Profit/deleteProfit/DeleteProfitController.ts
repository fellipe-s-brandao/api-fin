import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteExpenseTypeUseCase } from './DeleteExpenseTypeUseCase'

class DeleteProfitController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteExpenseUseCase = container.resolve(DeleteExpenseTypeUseCase)

    const expense = await deleteExpenseUseCase.execute(id)

    return response.status(204).json(expense)
  }
}

export { DeleteProfitController }
