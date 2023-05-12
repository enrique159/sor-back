import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { Product } from '../domain/interfaces'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { CreateProductRepository } from '../repository/CreateProductRepository'

export default class CreateProductUseCase implements BaseUseCase<Product, Promise<Product>> {

  async execute(payload: Product): Promise<Product> {
    const dbConnectionManager = DBConnectionManager.getInstance()
    const createCategoryRepository = new CreateProductRepository(dbConnectionManager)
    const category = await createCategoryRepository.execute(payload)
    return category
  }
}