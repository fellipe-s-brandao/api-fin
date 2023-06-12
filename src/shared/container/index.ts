import { container } from 'tsyringe'

import '@shared/container/providers'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'

import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository'
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository'
import { IExpensesRepository } from '@modules/expanses/repositories/IExpensesRepository'
import { ExpensesRepository } from '@modules/expanses/infra/typeorm/repositories/ExpensesRepository'
import { ExpenseTypesRepository } from '@modules/expanses/infra/typeorm/repositories/ExpenseTypesRepository'
import { IExpenseTypesRepository } from '@modules/expanses/repositories/IExpenseTypesRepository'

/**
 * Account
 */
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
container.registerSingleton<IUserTokensRepository>(
  'UsersTokensRepository',
  UserTokensRepository,
)

/**
 * Expanses
 */
container.registerSingleton<IExpensesRepository>(
  'ExpensesRepository',
  ExpensesRepository,
)
container.registerSingleton<IExpenseTypesRepository>(
  'ExpenseTypesRepository',
  ExpenseTypesRepository,
)
