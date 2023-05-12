import { BaseUseCase } from '@shared/common/BaseUseCase'
import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { GetCategoriesWithProductsRepository } from '../repository/GetCateogoriesWithProductsRepository'
import { Category, CategoryWithProducts } from '../domain/interfaces/Categories'
import { Product } from '../../products/domain/interfaces'
import { CategoriesAndProducts } from '../domain/services/GetCategoriesWithProductsRepositoryModel'

export default class GetCategoriesWithProductsUseCase implements BaseUseCase<string, Promise<CategoryWithProducts[]>> {

  async execute(id: string): Promise<CategoryWithProducts[]> {
    const dbConnectionManager = DBConnectionManager.getInstance()
    const getCategoriesRepository = new GetCategoriesWithProductsRepository(dbConnectionManager)
    const response: CategoriesAndProducts = await getCategoriesRepository.execute({ userId: id })
    const categoriesWithProducts: CategoryWithProducts[] = response.resultParent.map((category: Category & { _doc }) => {
      const products: Product[] = response.resultChild.filter((product: Product) => {
        return product.categoryId.toString() === category._id.toString()
      })
      return {
        ...category._doc,
        products,
      }
    })
    return categoriesWithProducts
  }
}