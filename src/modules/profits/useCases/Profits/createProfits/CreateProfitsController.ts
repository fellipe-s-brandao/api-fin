import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProfitsUseCase } from './CreateProfitsUseCase'

class CreateProfitsController {
  async handle(request: Request, response: Response) {
    const { name, description, profitAmount, profitTypeId, profitDate } =
      request.body

    const { id: userId } = request.user

    const createProfit = container.resolve(CreateProfitsUseCase)

    const profit = await createProfit.execute({
      name,
      description,
      profitAmount,
      profitTypeId,
      profitDate,
      userId,
    })

    return response.status(201).json(profit)
  }
}

export { CreateProfitsController }
