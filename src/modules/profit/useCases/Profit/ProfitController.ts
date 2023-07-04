import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ProfitUseCase } from './ProfitUseCase'

class ProfitController {
  async createProfitController(request: Request, response: Response) {
    const { name, description, profitAmount, profitTypeId, profitDate } =
      request.body

    const { id: userId } = request.user

    const profitUseCase = container.resolve(ProfitUseCase)

    const profit = await profitUseCase.createProfit({
      name,
      description,
      profitAmount,
      profitTypeId,
      profitDate,
      userId,
    })

    return response.status(201).json(profit)
  }

  async delteProfitController(request: Request, response: Response) {
    const { id } = request.params

    const profitUseCase = container.resolve(ProfitUseCase)
    await profitUseCase.deleteProfit(id)

    return response.status(204).json()
  }

  async listProfitController(request: Request, response: Response) {
    const { id: userId } = request.user

    const profitUseCase = container.resolve(ProfitUseCase)

    const profits = await profitUseCase.listProfit(userId)

    return response.status(200).json(profits)
  }

  async updateProfitController(request: Request, response: Response) {
    const { name, description, profitAmount, profitTypeId, profitDate } =
      request.body

    const { id } = request.params
    const { id: userId } = request.user

    const profitUseCase = container.resolve(ProfitUseCase)

    const expense = await profitUseCase.updateProfit({
      id,
      name,
      description,
      userId,
      profitAmount,
      profitTypeId,
      profitDate,
    })

    return response.status(200).json(expense)
  }
}

export { ProfitController }
