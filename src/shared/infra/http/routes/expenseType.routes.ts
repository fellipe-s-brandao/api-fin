import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateExpenseTypesController } from '@modules/expenses/useCases/ExpenseTypes/createExpenseTypes/CreateExpenseTypesController'
import { ListExpenseTypesController } from '@modules/expenses/useCases/ExpenseTypes/listExpenseTypes/ListExpenseTypesController'
import { DeleteExpenseTypesController } from '@modules/expenses/useCases/ExpenseTypes/deleteExpenseTypes/DeleteExpenseTypesController'
import { UpdateExpenseTypesController } from '@modules/expenses/useCases/ExpenseTypes/updateExpenseTypes/UpdateExpenseTypesController'

const expenseTypeRoutes = Router()
const createExpenseTypesController = new CreateExpenseTypesController()
const listExpenseTypesController = new ListExpenseTypesController()
const updateExpenseTypesController = new UpdateExpenseTypesController()
const deleteExpenseTypesController = new DeleteExpenseTypesController()

expenseTypeRoutes.post(
  '/',
  ensureAuthenticated,
  createExpenseTypesController.handle,
)

expenseTypeRoutes.get(
  '/',
  ensureAuthenticated,
  listExpenseTypesController.handle,
)

expenseTypeRoutes.put(
  '/:id',
  ensureAuthenticated,
  updateExpenseTypesController.handle,
)

expenseTypeRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteExpenseTypesController.handle,
)

export { expenseTypeRoutes }
