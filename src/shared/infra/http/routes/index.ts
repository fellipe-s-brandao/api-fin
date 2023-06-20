import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { usersRoutes } from './users.routes'
import { expenseRoutes } from './expense.routes'
import { expenseTypeRoutes } from './expenseType.routes'

const router = Router()

router.use('/users', usersRoutes)
router.use('/expense', expenseRoutes)
router.use('/expenseType', expenseTypeRoutes)

router.use(authenticateRoutes)

export { router }
