import { CategoriesAndProducts, GetCategoriesWithProductsRepositoryModel } from '../domain/services/GetCategoriesWithProductsRepositoryModel'
import { FindPopulateByParamsBaseRepository } from '@shared/common/repository'
import { CategoryModel } from '../data/model'
import { ProductModel } from '@app/modules/products/data/model'
import { Category } from '../domain/interfaces/Categories'
import { UserId } from '@app/modules/users/domain/interfaces'
import { ErrorHandler } from '@/app/shared/error/ErrorHandler'
import { Product } from '@app/modules/products/domain/interfaces'

export class GetCategoriesWithProductsRepository extends FindPopulateByParamsBaseRepository<UserId, Category, Product, CategoriesAndProducts> implements GetCategoriesWithProductsRepositoryModel {
  async execute(userId: UserId): Promise<CategoriesAndProducts> {
    const modelParent = CategoryModel()
    const modelChild = ProductModel()
    try {
      return await super.execute(userId, modelParent, modelChild)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}