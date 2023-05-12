import { FindByParamsBaseRepository } from '@shared/common/repository'
import HttpStatusCode from '@shared/enums/httpStatusCode'
import Exception from '@shared/error/Exception'
import ErrorCode from '@shared/error/errorCode'
import { CategoryModel } from '../data/model'
import { Category } from '../domain/interfaces/Categories'
import { GetCategoriesRepositoryModel } from '../domain/services/GetCategoriesRepositoryModel'
import { UserId } from '@app/modules/users/domain/interfaces'

export class GetCategoriesRepository extends FindByParamsBaseRepository<UserId, Category> implements GetCategoriesRepositoryModel {
  async execute(userId: UserId): Promise<Category[]> {
    const model = CategoryModel()
    try {
      return await super.execute(userId, model)
    } catch (error) {
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
    }
  }
}