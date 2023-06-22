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
import { IProfitRepository } from '@modules/profits/repositories/IProfitRepository'
import { ProfitsRepository } from '@modules/profits/infra/typeorm/repositories/ProfitsRepository'
import { IProfitTypesRepository } from '@modules/profits/repositories/IProfitTypesRepository'
import { ProfitTypesRepository } from '@modules/profits/infra/typeorm/repositories/ProfitTypesRepository'

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
 * Profits
 */
container.registerSingleton<IProfitRepository>(
  'ProfitsRepository',
  ProfitsRepository,
)
container.registerSingleton<IProfitTypesRepository>(
  'ProfitTypesRepository',
  ProfitTypesRepository,
)
