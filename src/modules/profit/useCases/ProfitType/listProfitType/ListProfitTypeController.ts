import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProfitTypeUseCase } from './ListProfitTypeUseCase'

class ListProfitTypeController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listProfitTypeUseCase = container.resolve(ListProfitTypeUseCase)

    const profitType = await listProfitTypeUseCase.execute(userId)

    return response.status(200).json(profitType)
  }
}

export { ListProfitTypeController }
