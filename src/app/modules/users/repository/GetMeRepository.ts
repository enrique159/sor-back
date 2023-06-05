import { GetMeRepositoryModel } from '../domain/services/GetMeRepositoryModel'
import { UserModel } from '../data/model'
import { User } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { FindOneBaseRepository } from '@shared/common/repository'
import { IId } from '@/app/shared/common/domain/IId'

export class GetMeRepository extends FindOneBaseRepository<IId,User> implements GetMeRepositoryModel {
  async execute(userId: IId): Promise<User> {
    const model = UserModel()
    try {
      return await super.execute(userId, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}