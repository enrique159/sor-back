import { CreateOneBaseRepository } from '@shared/common/repository/index'
import { ProductModel } from '../data/model'
import { Product } from '../domain/interfaces'
import { CreateProductRepositoryModel } from '../domain/services/CreateProductRepositoryModel'
import { ErrorHandler } from '@shared/error/ErrorHandler'

export class CreateProductRepository extends CreateOneBaseRepository<Product> implements CreateProductRepositoryModel {
  async execute(item: Product): Promise<Product> {
    const model = ProductModel()
    try {
      return await super.execute(item, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}