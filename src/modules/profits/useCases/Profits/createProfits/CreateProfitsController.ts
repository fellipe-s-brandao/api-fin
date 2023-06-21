import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateExpenseTypesUseCase } from './CreateExpenseTypesUseCase'

class CreateProfitsController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const { id: userId } = request.user

    const createExpenseType = container.resolve(CreateExpenseTypesUseCase)

    const expense = await createExpenseType.execute({
      name,
      description,
      userId,
    })

    return response.status(201).json(expense)
  }
}

export { CreateProfitsController }
