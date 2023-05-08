import type { User } from '../interfaces/index.js'

export interface CreateUserRepositoryModel {
  execute(payload: Partial<User>): Promise<User>;
}