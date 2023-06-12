import { CreateRpvRepositoryModel } from '../domain/services/CreateRpvRepositoryModel'
import { RpvModel } from '../data/model'
import { Rpv } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { CreateOneBaseRepository } from '@shared/common/repository'

export class CreateRpvRepository extends CreateOneBaseRepository<Rpv> implements CreateRpvRepositoryModel {
  async execute(item: Rpv): Promise<Rpv> {
    const model = RpvModel()
    try {
      return await super.execute(item, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}