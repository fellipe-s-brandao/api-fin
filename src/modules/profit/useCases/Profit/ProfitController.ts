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
    const filters = request.query

    const profitUseCase = container.resolve(ProfitUseCase)
    const profits = await profitUseCase.listProfit(userId, filters)

    return response.status(200).json(profits)
  }

  async updateProfitController(request: Request, response: Response) {
    const { name, description, profitAmount, profitTypeId, profitDate } =
      request.body

    const { id } = request.params
    const { id: userId } = request.user

    const profitUseCase = container.resolve(ProfitUseCase)

    const profit = await profitUseCase.updateProfit({
      id,
      name,
      description,
      userId,
      profitAmount,
      profitTypeId,
      profitDate,
    })

    return response.status(200).json(profit)
  }

  async listProfitByIdController(request: Request, response: Response) {
    const { id } = request.params

    const profitUseCase = container.resolve(ProfitUseCase)
    const profit = await profitUseCase.listProfitById(id)

    return response.status(200).json(profit)
  }

  async getTotalizersController(request: Request, response: Response) {
    const { id: userId } = request.user

    const profitUseCase = container.resolve(ProfitUseCase)
    const totalizers = await profitUseCase.getTotalizers(userId)

    return response.status(200).json(totalizers)
  }
}

export { ProfitController }
