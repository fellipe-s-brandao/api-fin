import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateProfitController } from '@modules/profit/useCases/Profit/createProfit/CreateProfitController'
import { ListProfitController } from '@modules/profit/useCases/Profit/listProfit/ListProfitController'
import { UpdateProfitController } from '@modules/profit/useCases/Profit/updateProfit/UpdateProfitController'
import { DeleteProfitController } from '@modules/profit/useCases/Profit/deleteProfit/DeleteProfitController'

const profitRoutes = Router()
const createProfitController = new CreateProfitController()
const listProfitController = new ListProfitController()
const updateProfitController = new UpdateProfitController()
const deleteProfitController = new DeleteProfitController()

profitRoutes.post('/', ensureAuthenticated, createProfitController.handle)

profitRoutes.get('/', ensureAuthenticated, listProfitController.handle)

profitRoutes.put('/:id', ensureAuthenticated, updateProfitController.handle)

profitRoutes.delete('/:id', ensureAuthenticated, deleteProfitController.handle)

export { profitRoutes }
