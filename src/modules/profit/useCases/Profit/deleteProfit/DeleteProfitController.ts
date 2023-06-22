import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteProfitUseCase } from './DeleteProfitUseCase'

class DeleteProfitController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteProfitUseCase = container.resolve(DeleteProfitUseCase)

    await deleteProfitUseCase.execute(id)

    return response.status(204).json()
  }
}

export { DeleteProfitController }
