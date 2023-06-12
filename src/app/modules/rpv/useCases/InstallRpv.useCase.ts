import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { InstallRpvRepository } from '../repository/InstallRpvRepository'
import { AuthRpv, AuthRpvResponse, Rpv } from '../domain/interfaces'
import { QueryParams } from '@/app/auth/domain/interfaces'
import Exception from '@/app/shared/error/Exception'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'
import ErrorCode from '@/app/shared/error/errorCode'
import { comparePassword } from '@/utils/comparePasswords'
import { generateToken } from '@/plugins/jwt/generateToken'
import { InstallRpvResponse } from '../domain/interfaces/Auth'

export default class InstallRpvUseCase implements BaseUseCase<Rpv, Promise<InstallRpvResponse>> {
  async execute(payload: AuthRpv): Promise<InstallRpvResponse> {
    const connection = await DBConnectionManager.getInstance()
    const repository = new InstallRpvRepository(connection)
    // Query
    const query: QueryParams = { alias: payload.alias }
    // Execute
    const response = await repository.execute(query)
    if (!response) throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.ERR0001)
    try {
      const validPassword = comparePassword(payload.password, response.password)
      if (!validPassword)
        throw new Exception(HttpStatusCode.UNAUTHORIZED, ErrorCode.ERR0017)
    } catch (err) {
      if (err instanceof Exception && err.errors[0].code === ErrorCode.ERR0017.code)
        throw new Exception(HttpStatusCode.UNAUTHORIZED, ErrorCode.ERR0017)
      else
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
    }

    const authRpvResponse: AuthRpvResponse = {
      _id: response._id,
      name: response.name,
      type: response.type,
      description: response.description ?? '',
      alias: response.alias,
      restaurantId: response.restaurantId,
    }

    const token = generateToken<AuthRpvResponse>(authRpvResponse, false)
    const installRpvResponse: InstallRpvResponse = {
      token,
      rpv: authRpvResponse,
    }
    // Return
    return installRpvResponse
  }
}