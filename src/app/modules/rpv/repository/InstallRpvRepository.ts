import { InstallRpvRepositoryModel } from '../domain/services/InstallRpvRepositoryModel'
import { RpvModel } from '../data/model'
import { Rpv } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { FindOneBaseRepository } from '@shared/common/repository'
import { QueryParams } from '@/app/auth/domain/interfaces'

export class InstallRpvRepository extends FindOneBaseRepository<QueryParams,Rpv> implements InstallRpvRepositoryModel {
  async execute(item: QueryParams): Promise<Rpv> {
    const model = RpvModel()
    try {
      return await super.execute(item, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}