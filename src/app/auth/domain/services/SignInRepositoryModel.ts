import { User } from '@app/modules/users/domain/interfaces/Users.js'
import type { QueryParams } from '../interfaces/index.js'

export interface SignInRepositoryModel {
  execute(payload: QueryParams): Promise<User>;
}