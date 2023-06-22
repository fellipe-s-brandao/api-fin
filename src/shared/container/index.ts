import { container } from 'tsyringe'

import '@shared/container/providers'

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'

import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'
import { UserTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository'
import { IExpenseRepository } from '@modules/expense/repositories/IExpenseRepository'
import { ExpenseRepository } from '@modules/expense/infra/typeorm/repositories/ExpenseRepository'
import { IExpenseTypeRepository } from '@modules/expense/repositories/IExpenseTypeRepository'
import { ExpenseTypeRepository } from '@modules/expense/infra/typeorm/repositories/ExpenseTypeRepository'
import { IProfitRepository } from '@modules/profit/repositories/IProfitRepository'
import { ProfitRepository } from '@modules/profit/infra/typeorm/repositories/ProfitRepository'
import { IProfitTypeRepository } from '@modules/profit/repositories/IProfitTypeRepository'
import { ProfitTypeRepository } from '@modules/profit/infra/typeorm/repositories/ProfitTypeRepository'

/**
 * Account
 */
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokenRepository,
)

/**
 * Expense
 */
container.registerSingleton<IExpenseRepository>(
  'ExpenseRepository',
  ExpenseRepository,
)
container.registerSingleton<IExpenseTypeRepository>(
  'ExpenseTypeRepository',
  ExpenseTypeRepository,
)

/**
 * Profit
 */
container.registerSingleton<IProfitRepository>(
  'ProfitRepository',
  ProfitRepository,
)
container.registerSingleton<IProfitTypeRepository>(
  'ProfitTypeRepository',
  ProfitTypeRepository,
)
