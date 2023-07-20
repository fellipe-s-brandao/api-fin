import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ProfitController } from '@modules/profit/useCases/Profit/ProfitController'

const profitRoutes = Router()
const profitController = new ProfitController()

profitRoutes.post(
  '/',
  ensureAuthenticated,
  profitController.createProfitController,
)

profitRoutes.get(
  '/',
  ensureAuthenticated,
  profitController.listProfitController,
)

profitRoutes.put(
  '/:id',
  ensureAuthenticated,
  profitController.updateProfitController,
)

profitRoutes.get(
  '/byId/:id',
  ensureAuthenticated,
  profitController.listProfitByIdController,
)

profitRoutes.delete(
  '/:id',
  ensureAuthenticated,
  profitController.delteProfitController,
)

profitRoutes.get(
  '/totalizers',
  ensureAuthenticated,
  profitController.getTotalizersController,
)

export { profitRoutes }
