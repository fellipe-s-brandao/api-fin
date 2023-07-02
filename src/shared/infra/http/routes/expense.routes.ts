import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ExpenseController } from '@modules/expense/useCases/Expense/ExpenseController'

const expenseRoutes = Router()
const expenseController = new ExpenseController()

expenseRoutes.post(
  '/',
  ensureAuthenticated,
  expenseController.createExpenseController,
)

expenseRoutes.get(
  '/',
  ensureAuthenticated,
  expenseController.listExpenseController,
)

expenseRoutes.put(
  '/:id',
  ensureAuthenticated,
  expenseController.updateExpenseController,
)

expenseRoutes.delete(
  '/:id',
  ensureAuthenticated,
  expenseController.deleteExpenseController,
)

export { expenseRoutes }
