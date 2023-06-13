import { CreateExpensesController } from '@modules/expenses/useCases/Expenses/createExpenses/CreateExpensesController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ListExpensesController } from '@modules/expenses/useCases/Expenses/listExpenses/ListExpensesController'
import { UpdateExpensesController } from '@modules/expenses/useCases/Expenses/updateExpenses/UpdateExpensesController'
import { DeleteExpensesController } from '@modules/expenses/useCases/Expenses/deleteExpenses/DeleteExpensesController'

const expenseRoutes = Router()
const createExpensesController = new CreateExpensesController()
const listExpensesController = new ListExpensesController()
const updateExpensesController = new UpdateExpensesController()
const deleteExpensesController = new DeleteExpensesController()

expenseRoutes.post('/', ensureAuthenticated, createExpensesController.handle)
expenseRoutes.get('/', ensureAuthenticated, listExpensesController.handle)
expenseRoutes.put('/:id', ensureAuthenticated, updateExpensesController.handle)
expenseRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteExpensesController.handle,
)

export { expenseRoutes }
