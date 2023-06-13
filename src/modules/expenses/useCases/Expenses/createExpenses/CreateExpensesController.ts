import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateExpensesUseCase } from './CreateExpensesUseCase'

class CreateExpensesController {
  async handle(request: Request, response: Response) {
    const { name, description, amountSpent, expenseTypeId, expenseDate } =
      request.body

    const { id: userId } = request.user

    const createExpense = container.resolve(CreateExpensesUseCase)

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

export { CreateExpensesController }
