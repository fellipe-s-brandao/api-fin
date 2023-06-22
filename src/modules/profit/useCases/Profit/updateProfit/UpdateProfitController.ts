import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProfitUseCase } from './UpdateProfitUseCase'

class UpdateProfitController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const { id } = request.params
    const { id: userId } = request.user

    const updateProfitUseCase = container.resolve(UpdateProfitUseCase)

    const expense = await updateProfitUseCase.execute({
      id,
      name,
      description,
      userId,
    })

    return response.status(200).json(expense)
  }
}

export { UpdateProfitController }
