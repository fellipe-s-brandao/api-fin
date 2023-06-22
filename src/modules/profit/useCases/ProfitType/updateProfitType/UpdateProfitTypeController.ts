import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProfitTypeUseCase } from './UpdateProfitTypeUseCase'

class UpdateProfitTypeController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const { id } = request.params
    const { id: userId } = request.user

    const updateProfitTypeUseCase = container.resolve(UpdateProfitTypeUseCase)

    const profitType = await updateProfitTypeUseCase.execute({
      id,
      name,
      description,
      userId,
    })

    return response.status(200).json(profitType)
  }
}

export { UpdateProfitTypeController }
