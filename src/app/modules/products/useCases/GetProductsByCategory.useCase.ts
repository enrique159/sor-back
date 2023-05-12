import { BaseUseCase } from '@shared/common/BaseUseCase'
import { Product } from '../domain/interfaces'
import DBConnectionManager from '@/app/shared/database/services/DBConnectionManager'
import GetProductsByCategoryRepository from '../repository/GetProductsByCategoryRepository'
import { IParams } from '../domain/services/GetProductsByCategoryRepositoryModel'

export default class GetProductsByCategoryUseCase implements BaseUseCase<IParams, Promise<Product[]>> {
  async execute(params: IParams): Promise<Product[]> {
    const db = DBConnectionManager.getInstance()
    const getProductsByCategoryRepository = new GetProductsByCategoryRepository(db)
    const products: Product[] = await getProductsByCategoryRepository.execute(params)
    return products
  }
}