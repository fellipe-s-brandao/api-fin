import { CreateExpensesController } from '@modules/expenses/useCases/Expenses/createExpenses/CreateExpensesController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const expenseRoutes = Router()
const createExpensesController = new CreateExpensesController()

expenseRoutes.post('/', ensureAuthenticated, createExpensesController.handle)

export { expenseRoutes }
