import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProfitUseCase } from './ListProfitUseCase'

class ListProfitController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listProfit = container.resolve(ListProfitUseCase)

    const profits = await listProfit.execute(userId)

    return response.status(200).json(profits)
  }
}

export { ListProfitController }
