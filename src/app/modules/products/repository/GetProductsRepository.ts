import { FindByParamsBaseRepository } from '@shared/common/repository'
import { ProductModel } from '../data/model'
import { Product } from '../domain/interfaces'
import { GetProductsRepositoryModel } from '../domain/services/GetProductsRepositoryModel'
import { UserId } from '@app/modules/users/domain/interfaces'
import { ErrorHandler } from '@/app/shared/error/ErrorHandler'

export class GetProductsRepository extends FindByParamsBaseRepository<UserId, Product> implements GetProductsRepositoryModel {
  async execute(userId: UserId): Promise<Product[]> {
    const model = ProductModel()
    try {
      return await super.execute(userId, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}