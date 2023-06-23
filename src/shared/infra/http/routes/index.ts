import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { userRoutes } from './user.routes'
import { expenseRoutes } from './expense.routes'
import { expenseTypeRoutes } from './expenseType.routes'
import { profitRoutes } from './profit.routes'
import { profitTypeRoutes } from './profitType.routes'

const router = Router()

router.use('/user', userRoutes)

router.use('/expense', expenseRoutes)
router.use('/expenseType', expenseTypeRoutes)

router.use('/profit', profitRoutes)
router.use('/profitType', profitTypeRoutes)

router.use(authenticateRoutes)

export { router }
