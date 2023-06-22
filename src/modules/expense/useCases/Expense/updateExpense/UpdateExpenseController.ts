import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateExpenseUseCase } from './UpdateExpenseUseCase'

class UpdateExpenseController {
  async handle(request: Request, response: Response) {
    const { name, description, amountSpent, expenseTypeId, expenseDate } =
      request.body

    const { id } = request.params
    const { id: userId } = request.user

    const updateExpense = container.resolve(UpdateExpenseUseCase)

    const expense = await updateExpense.execute({
      id,
      name,
      description,
      amountSpent,
      expenseTypeId,
      expenseDate,
      userId,
    })

    return response.status(200).json(expense)
  }
}

export { UpdateExpenseController }
