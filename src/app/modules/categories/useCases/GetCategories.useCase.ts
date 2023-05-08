import { BaseUseCase } from '@shared/common/BaseUseCase'
import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { GetCategoriesRepository } from '../repository/GetCategoriesRepository'
import { Category } from '../domain/interfaces/Categories'

export default class GetCategoriesUseCase implements BaseUseCase<null, Promise<Category[]>> {

  async execute(): Promise<Category[]> {
    const dbConnectionManager = DBConnectionManager.getInstance()
    const getCategoriesRepository = new GetCategoriesRepository(dbConnectionManager)
    const categories = await getCategoriesRepository.execute()
    return categories
  }
}