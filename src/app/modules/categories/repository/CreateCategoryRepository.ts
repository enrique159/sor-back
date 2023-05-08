import { CreateOneBaseRepository } from '../../../shared/common/repository/index'
import MongoDBErrorCodes from '../../../shared/enums/MongoDBErrorCodes'
import HttpStatusCode from '../../../shared/enums/httpStatusCode'
import Exception from '../../../shared/error/Exception'
import Warning from '../../../shared/error/Warning'
import ErrorCode from '../../../shared/error/errorCode'
import { CategoryModel } from '../data/model'
import { Category } from '../domain/interfaces/Categories'
import { CreateCategoryRepositoryModel } from '../domain/services/CreateCategoryRepositoryModel'

export class CreateCategoryRepository extends CreateOneBaseRepository<Category> implements CreateCategoryRepositoryModel {
  async execute(item: Category): Promise<Category> {
    const model = CategoryModel()
    try {
      return await super.execute(item, model)
    } catch (error) {
      // Check MongoDB Error Code
      if (error.code === MongoDBErrorCodes.DUPLICATE_KEY)
        throw new Warning(HttpStatusCode.CONFLICT, ErrorCode.ERR0007)
      else
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
    }
  }
}