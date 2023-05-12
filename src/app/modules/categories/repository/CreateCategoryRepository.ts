import { ErrorHandler } from '@app/shared/error/ErrorHandler'
import { CreateOneBaseRepository } from '@shared/common/repository/index'
import { CategoryModel } from '../data/model'
import { Category } from '../domain/interfaces/Categories'
import { CreateCategoryRepositoryModel } from '../domain/services/CreateCategoryRepositoryModel'

export class CreateCategoryRepository extends CreateOneBaseRepository<Category> implements CreateCategoryRepositoryModel {
  async execute(item: Category): Promise<Category> {
    const model = CategoryModel()
    try {
      return await super.execute(item, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}