import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { GetMeRepository } from '../repository/GetMeRepository'
import { IId } from '@/app/shared/common/domain/IId'
import { UserAuth } from '@/app/auth/domain/interfaces'

export default class GetMeUseCase implements BaseUseCase<IId, Promise<UserAuth>> {
  async execute(userId: IId): Promise<UserAuth> {
    const connection = await DBConnectionManager.getInstance()
    const repository = new GetMeRepository(connection)
    const response = await repository.execute(userId)

    const userAuth: UserAuth = {
      _id: response._id,
      email: response.email,
      name: response.name,
      role: response.role,
    }
    return userAuth
  }
}