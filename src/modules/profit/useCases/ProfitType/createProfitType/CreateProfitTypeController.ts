import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProfitTypeUseCase } from './CreateProfitTypeUseCase'

class CreateProfitTypeController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const { id: userId } = request.user

    const createProfitTypeUseCase = container.resolve(CreateProfitTypeUseCase)

    const profitType = await createProfitTypeUseCase.execute({
      name,
      description,
      userId,
    })

    return response.status(201).json(profitType)
  }
}

export { CreateProfitTypeController }
