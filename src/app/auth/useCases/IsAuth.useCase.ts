import { BaseUseCase } from '@shared/common/BaseUseCase'
import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import HttpStatusCode from '@shared/enums/httpStatusCode'
import Exception from '@shared/error/Exception'
import ErrorCode from '@shared/error/errorCode'
import { UserAuth } from '../domain/interfaces/Auth'
import { QueryParams } from '../domain/services/IsAuthRepositoryModel'
import { IsAuthRepository } from '../repository/IsAuthRepository'

export default class IsAuthUseCase implements BaseUseCase<string, Promise<UserAuth>> {
  async execute(params?: string): Promise<UserAuth> {
    // Dependency Injection
    const dbConnectionManager = DBConnectionManager.getInstance()
    const isAuthRepository = new IsAuthRepository(dbConnectionManager)
    // Execute
    const query: QueryParams = { email: params }
    const user = await isAuthRepository.execute(query)
    if(!user) throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.ERR0001)

    const userAuth: UserAuth = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    }

    return userAuth
  }
}