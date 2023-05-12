import { FindByParamsBaseRepository } from '@/app/shared/common/repository'
import { Product } from '../domain/interfaces'
import { GetProductsByCategoryRepositoryModel, IParams } from '../domain/services/GetProductsByCategoryRepositoryModel'
import { ProductModel } from '../data/model'
import { ErrorHandler } from '@/app/shared/error/ErrorHandler'

export default class GetProductsByCategoryRepository extends FindByParamsBaseRepository<IParams, Product> implements GetProductsByCategoryRepositoryModel {
  public async execute(item: IParams): Promise<Product[]> {
    const model = ProductModel()
    try {
      return await super.execute(item, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}