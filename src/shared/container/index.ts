import { container } from 'tsyringe'

import '@shared/container/providers'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'

import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository'
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository'
import { IExpensesRepository } from '@modules/expenses/repositories/IExpensesRepository'
import { ExpensesRepository } from '@modules/expenses/infra/typeorm/repositories/ExpensesRepository'
import { IExpenseTypesRepository } from '@modules/expenses/repositories/IExpenseTypesRepository'
import { ExpenseTypesRepository } from '@modules/expenses/infra/typeorm/repositories/ExpenseTypesRepository'

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
 * Expenses
 */
container.registerSingleton<IExpensesRepository>(
  'ExpensesRepository',
  ExpensesRepository,
)
container.registerSingleton<IExpenseTypesRepository>(
  'ExpenseTypesRepository',
  ExpenseTypesRepository,
)
