import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ProfitTypeUseCase } from './ProfitTypeUseCase'

class ProfitTypeController {
  async createProfitTypeController(request: Request, response: Response) {
    const { name, description } = request.body

    const { id: userId } = request.user

    const profitTypeUseCase = container.resolve(ProfitTypeUseCase)

    const profitType = await profitTypeUseCase.createProfitType({
      name,
      description,
      userId,
    })

    return response.status(201).json(profitType)
  }

  async deleteProfitTypeController(request: Request, response: Response) {
    const { id } = request.params

    const profitTypeUseCase = container.resolve(ProfitTypeUseCase)
    const profitType = await profitTypeUseCase.deleteProfitType(id)

    return response.status(204).json(profitType)
  }

  async listProfitTypeController(request: Request, response: Response) {
    const { id: userId } = request.user

    const profitTypeUseCase = container.resolve(ProfitTypeUseCase)

    const profitType = await profitTypeUseCase.listProfitType(userId)

    return response.status(200).json(profitType)
  }

  async updateProfitTypeController(request: Request, response: Response) {
    const { name, description } = request.body

    const { id } = request.params
    const { id: userId } = request.user

    const profitTypeUseCase = container.resolve(ProfitTypeUseCase)

    const profitType = await profitTypeUseCase.updateProfitType({
      id,
      name,
      description,
      userId,
    })

    return response.status(200).json(profitType)
  }

  async listProfitTypeByIdController(request: Request, response: Response) {
    const { id } = request.params

    const profitTypeUseCase = container.resolve(ProfitTypeUseCase)
    const profitType = await profitTypeUseCase.listProfitTypetById(id)

    return response.status(200).json(profitType)
  }
}

export { ProfitTypeController }
