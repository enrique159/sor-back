import { User } from '../../modules/users/domain/interfaces/Users'
import { FindOneBaseRepository } from '../../shared/common/repository/index'
import { SignInRepositoryModel } from '../domain/services/SignInRepositoryModel'

import { QueryParams } from '../domain/interfaces/index'
import { UserModel } from '../../modules/users/data/model'
import Exception from '../../shared/error/Exception'
import HttpStatusCode from '../../shared/enums/httpStatusCode'
import ErrorCode from '../../shared/error/errorCode'

export class SignInRepository extends FindOneBaseRepository<QueryParams, User> implements SignInRepositoryModel {
  async execute(item: QueryParams): Promise<User> {
    try {
      return await super.execute(item, UserModel())
    } catch (error) {
      console.log(error)
      throw new Exception(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR0008)
    }
  }
}