import { CreateExpensesController } from '@modules/expenses/useCases/Expenses/createExpenses/CreateExpensesController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ListExpensesController } from '@modules/expenses/useCases/Expenses/listExpenses/ListExpensesController'

const expenseRoutes = Router()
const createExpensesController = new CreateExpensesController()
const listExpensesController = new ListExpensesController()

expenseRoutes.post('/', ensureAuthenticated, createExpensesController.handle)
expenseRoutes.get('/', ensureAuthenticated, listExpensesController.handle)

export { expenseRoutes }
