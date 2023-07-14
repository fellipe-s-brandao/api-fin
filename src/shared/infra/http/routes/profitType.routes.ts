import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ProfitTypeController } from '@modules/profit/useCases/ProfitType/ProfitTypeController'

const profitTypeRoutes = Router()
const profitTypeController = new ProfitTypeController()

profitTypeRoutes.post(
  '/',
  ensureAuthenticated,
  profitTypeController.createProfitTypeController,
)

profitTypeRoutes.get(
  '/',
  ensureAuthenticated,
  profitTypeController.listProfitTypeController,
)

profitTypeRoutes.put(
  '/:id',
  ensureAuthenticated,
  profitTypeController.updateProfitTypeController,
)

profitTypeRoutes.get(
  '/byId/:id',
  ensureAuthenticated,
  profitTypeController.listProfitTypeByIdController,
)

profitTypeRoutes.delete(
  '/:id',
  ensureAuthenticated,
  profitTypeController.deleteProfitTypeController,
)

export { profitTypeRoutes }
