import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateProfitTypeController } from '@modules/profit/useCases/ProfitType/createProfitType/CreateProfitTypeController'
import { ListProfitTypeController } from '@modules/profit/useCases/ProfitType/listProfitType/ListProfitTypeController'
import { UpdateProfitTypeController } from '@modules/profit/useCases/ProfitType/updateProfitType/UpdateProfitTypeController'
import { DeleteProfitTypeController } from '@modules/profit/useCases/ProfitType/deleteProfitType/DeleteProfitTypeController'

const profitTypeRoutes = Router()
const createProfitTypeController = new CreateProfitTypeController()
const listProfitTypeController = new ListProfitTypeController()
const updateProfitTypeController = new UpdateProfitTypeController()
const deleteProfitTypeController = new DeleteProfitTypeController()

profitTypeRoutes.post(
  '/',
  ensureAuthenticated,
  createProfitTypeController.handle,
)

profitTypeRoutes.get('/', ensureAuthenticated, listProfitTypeController.handle)

profitTypeRoutes.put(
  '/:id',
  ensureAuthenticated,
  updateProfitTypeController.handle,
)

profitTypeRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteProfitTypeController.handle,
)

export { profitTypeRoutes }
