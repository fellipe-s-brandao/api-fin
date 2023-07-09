import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ExpenseTypeController } from '@modules/expense/useCases/ExpenseType/ExpenseTypeController'

const expenseTypeRoutes = Router()
const expenseTypeController = new ExpenseTypeController()

expenseTypeRoutes.post(
  '/',
  ensureAuthenticated,
  expenseTypeController.createExpenseTypeController,
)

expenseTypeRoutes.get(
  '/',
  ensureAuthenticated,
  expenseTypeController.listExpenseTypeController,
)

expenseTypeRoutes.put(
  '/:id',
  ensureAuthenticated,
  expenseTypeController.updateExpenseTypeController,
)

expenseTypeRoutes.delete(
  '/:id',
  ensureAuthenticated,
  expenseTypeController.deleteExpenseTypeController,
)

export { expenseTypeRoutes }
