import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProfitUseCase } from './ListProfitUseCase'

class ListProfitController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listProfitUseCase = container.resolve(ListProfitUseCase)

    const profits = await listProfitUseCase.execute(userId)

    return response.status(200).json(profits)
  }
}

export { ListProfitController }
