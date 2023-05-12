import { BaseUseCase } from '@shared/common/BaseUseCase'
import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { GetProductsRepository } from '../repository/GetProductsRepository'
import { Product } from '../domain/interfaces'

export default class GetProductsUseCase implements BaseUseCase<string, Promise<Product[]>> {
  async execute(id: string): Promise<Product[]> {
    const dbConnectionManager = DBConnectionManager.getInstance()
    const getCategoriesRepository = new GetProductsRepository(dbConnectionManager)
    const products = await getCategoriesRepository.execute({ userId: id })
    return products
  }
}