import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateExpenseTypeController } from '@modules/expense/useCases/ExpenseType/createExpenseType/CreateExpenseTypeController'
import { ListExpenseTypeController } from '@modules/expense/useCases/ExpenseType/listExpenseType/ListExpenseTypeController'
import { DeleteExpenseTypeController } from '@modules/expense/useCases/ExpenseType/deleteExpenseType/DeleteExpenseTypeController'
import { UpdateExpenseTypeController } from '@modules/expense/useCases/ExpenseType/updateExpenseType/UpdateExpenseTypeController'

const expenseTypeRoutes = Router()
const createExpenseTypeController = new CreateExpenseTypeController()
const listExpenseTypeController = new ListExpenseTypeController()
const updateExpenseTypeController = new UpdateExpenseTypeController()
const deleteExpenseTypeController = new DeleteExpenseTypeController()

expenseTypeRoutes.post(
  '/',
  ensureAuthenticated,
  createExpenseTypeController.handle,
)

expenseTypeRoutes.get(
  '/',
  ensureAuthenticated,
  listExpenseTypeController.handle,
)

expenseTypeRoutes.put(
  '/:id',
  ensureAuthenticated,
  updateExpenseTypeController.handle,
)

expenseTypeRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteExpenseTypeController.handle,
)

export { expenseTypeRoutes }
