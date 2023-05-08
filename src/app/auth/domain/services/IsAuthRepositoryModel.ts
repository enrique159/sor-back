import { User } from '@app/modules/users/domain/interfaces/Users.js'

export interface QueryParams {
  email: string;
}

export interface IsAuthRepositoryModel {
  execute(item: QueryParams): Promise<User>;
}