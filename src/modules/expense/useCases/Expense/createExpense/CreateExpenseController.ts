import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateExpenseUseCase } from './CreateExpenseUseCase'

class CreateExpenseController {
  async handle(request: Request, response: Response) {
    const { name, description, amountSpent, expenseTypeId, expenseDate } =
      request.body

    const { id: userId } = request.user

    const createExpense = container.resolve(CreateExpenseUseCase)

    const expense = await createExpense.execute({
      name,
      description,
      amountSpent,
      expenseTypeId,
      expenseDate,
      userId,
    })

    return response.status(201).json(expense)
  }
}

export { CreateExpenseController }
