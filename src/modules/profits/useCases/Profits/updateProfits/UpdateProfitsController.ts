import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateExpenseTypeUseCase } from './UpdateExpenseTypeUseCase'

class UpdateProfitsController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const { id } = request.params
    const { id: userId } = request.user

    const updateExpenseType = container.resolve(UpdateExpenseTypeUseCase)

    const expense = await updateExpenseType.execute({
      id,
      name,
      description,
      userId,
    })

    return response.status(200).json(expense)
  }
}

export { UpdateProfitsController }
