import { CreateOneBaseRepository } from '@shared/common/repository/index'
import { UserModel } from '../data/model'
import { User } from '../domain/interfaces/Users'
import { CreateUserRepositoryModel } from '../domain/services/CreateUserRepositoryModel'
import { ErrorHandler } from '@shared/error/ErrorHandler'

export class CreateUserRepository extends CreateOneBaseRepository<User> implements CreateUserRepositoryModel{
  async execute(item: Partial<User>): Promise<User> {
    const model = UserModel()
    try {
      return await super.execute(item, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}