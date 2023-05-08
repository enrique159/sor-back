import { CreateOneBaseRepository } from '@shared/common/repository/index'
import HttpStatusCode from '@shared/enums/httpStatusCode'
import Exception from '@shared/error/Exception'
import { UserModel } from '../data/model'
import { User } from '../domain/interfaces/Users'
import { CreateUserRepositoryModel } from '../domain/services/CreateUserRepositoryModel'
import ErrorCode from '@shared/error/errorCode'
import MongoDBErrorCodes from '@shared/enums/MongoDBErrorCodes'
import Warning from '@shared/error/Warning'

export class CreateUserRepository extends CreateOneBaseRepository<User> implements CreateUserRepositoryModel{
  async execute(item: Partial<User>): Promise<User> {
    const model = UserModel()
    try {
      return await super.execute(item, model)
    } catch (error) {
      // Check MongoDB Error Code
      if (error.code === MongoDBErrorCodes.DUPLICATE_KEY)
        throw new Warning(HttpStatusCode.CONFLICT, ErrorCode.ERR0007)
      else
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
    }
  }
}