import { comparePassword } from '@/utils/comparePasswords.js'
import { BaseUseCase } from '@shared/common/BaseUseCase.js'
import DBConnectionManager from '@shared/database/services/DBConnectionManager.js'
import Exception from '@shared/error/Exception.js'
import { Auth, AuthResponse, QueryParams, UserAuth } from '../domain/interfaces/Auth.js'
import { SignInRepository } from '../repository/SignInRepository.js'
import { generateToken } from '@/plugins/jwt/generateToken.js'
import ErrorCode from '@shared/error/errorCode.js'
import HttpStatusCode from '@shared/enums/httpStatusCode.js'

export default class SignInUseCase implements BaseUseCase<Auth, Promise<AuthResponse>> {
  async execute(payload: Auth): Promise<AuthResponse> {
    // Dependency Injection
    const dbConnectionManager = DBConnectionManager.getInstance()
    const signInRepository = new SignInRepository(dbConnectionManager)
    // Query
    const query: QueryParams = { email: payload.email }
    // Execute
    const user = await signInRepository.execute(query)
    if (user) {
      try {
        const validPassword = comparePassword(payload.password, user.password)
        if (!validPassword) {
          throw new Exception(HttpStatusCode.UNAUTHORIZED, ErrorCode.ERR0017)
        }
      } catch (err) {
        if (err instanceof Exception && err.errors[0].code === ErrorCode.ERR0017.code) {
          throw new Exception(HttpStatusCode.UNAUTHORIZED, ErrorCode.ERR0017)
        } else
          throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
      }
    } else {
      throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.ERR0001)
    }

    const userAuth: UserAuth = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    const token = generateToken(userAuth)
    const authResponse: AuthResponse = {
      token: token,
      user: userAuth,
    }
    // Return
    return authResponse
  }
}