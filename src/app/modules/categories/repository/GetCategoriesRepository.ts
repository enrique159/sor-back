import { FindBaseRepository } from '@shared/common/repository/index'
import HttpStatusCode from '@shared/enums/httpStatusCode'
import Exception from '@shared/error/Exception'
import ErrorCode from '@shared/error/errorCode'
import { CategoryModel } from '../data/model'
import { Category } from '../domain/interfaces/Categories'
import { GetCategoriesRepositoryModel } from '../domain/services/GetCategoriesRepositoryModel'

export class GetCategoriesRepository extends FindBaseRepository<Category> implements GetCategoriesRepositoryModel {
  async execute(): Promise<Category[]> {
    const model = CategoryModel()
    try {
      return await super.execute(model)
    } catch (error) {
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
    }
  }
}