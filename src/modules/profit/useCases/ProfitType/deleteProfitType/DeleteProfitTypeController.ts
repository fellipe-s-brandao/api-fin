import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteProfitTypeUseCase } from './DeleteProfitTypeUseCase'

class DeleteProfitTypeController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteProfitTypeUseCase = container.resolve(DeleteProfitTypeUseCase)

    const profitType = await deleteProfitTypeUseCase.execute(id)

    return response.status(204).json(profitType)
  }
}

export { DeleteProfitTypeController }
