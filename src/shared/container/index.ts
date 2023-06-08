import { container } from 'tsyringe';

import "@shared/container/providers";

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';

import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
    "UsersTokensRepository",
    UserTokensRepository
)