import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { userRoutes } from './user.routes'
import { expenseRoutes } from './expense.routes'
import { expenseTypeRoutes } from './expenseType.routes'
import { profitRoutes } from './profit.routes'

const router = Router()

router.use('/user', userRoutes)

router.use('/expense', expenseRoutes)
router.use('/expenseType', expenseTypeRoutes)

router.use('/profit', profitRoutes)

router.use(authenticateRoutes)

export { router }
