import { CreateOneBaseRepository } from '@shared/common/repository/index'
import MongoDBErrorCodes from '@shared/enums/MongoDBErrorCodes'
import HttpStatusCode from '@shared/enums/httpStatusCode'
import Exception from '@shared/error/Exception'
import Warning from '@shared/error/Warning'
import ErrorCode from '@shared/error/errorCode'
import { ProductModel } from '../data/model'
import { Product } from '../domain/interfaces'
import { CreateProductRepositoryModel } from '../domain/services/CreateProductRepositoryModel'

export class CreateProductRepository extends CreateOneBaseRepository<Product> implements CreateProductRepositoryModel {
  async execute(item: Product): Promise<Product> {
    const model = ProductModel()
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