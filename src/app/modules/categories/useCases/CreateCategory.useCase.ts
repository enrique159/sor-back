import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { Category } from '../domain/interfaces/Categories'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { CreateCategoryRepository } from '../repository/CreateCategoryRepository'

export default class CreateCategoryUseCase implements BaseUseCase<Category, Promise<Category>> {
  async execute(payload: Category): Promise<Category> {
    const dbConnectionManager = DBConnectionManager.getInstance()
    const createCategoryRepository = new CreateCategoryRepository(dbConnectionManager)
    const category = await createCategoryRepository.execute(payload)
    return category
  }
}