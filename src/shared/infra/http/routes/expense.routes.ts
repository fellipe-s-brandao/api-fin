import { CreateExpenseController } from '@modules/expense/useCases/Expense/createExpense/CreateExpenseController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ListExpenseController } from '@modules/expense/useCases/Expense/listExpense/ListExpenseController'
import { UpdateExpenseController } from '@modules/expense/useCases/Expense/updateExpense/UpdateExpenseController'
import { DeleteExpenseController } from '@modules/expense/useCases/Expense/deleteExpense/DeleteExpenseController'

const expenseRoutes = Router()
const createExpenseController = new CreateExpenseController()
const listExpenseController = new ListExpenseController()
const updateExpenseController = new UpdateExpenseController()
const deleteExpenseController = new DeleteExpenseController()

expenseRoutes.post('/', ensureAuthenticated, createExpenseController.handle)

expenseRoutes.get('/', ensureAuthenticated, listExpenseController.handle)

expenseRoutes.put('/:id', ensureAuthenticated, updateExpenseController.handle)

expenseRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteExpenseController.handle,
)

export { expenseRoutes }
