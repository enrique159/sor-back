import { FindByParamsBaseRepository } from '@shared/common/repository'
import { CategoryModel } from '../data/model'
import { Category } from '../domain/interfaces/Categories'
import { GetCategoriesRepositoryModel } from '../domain/services/GetCategoriesRepositoryModel'
import { UserId } from '@app/modules/users/domain/interfaces'
import { ErrorHandler } from '@/app/shared/error/ErrorHandler'

export class GetCategoriesRepository extends FindByParamsBaseRepository<UserId, Category> implements GetCategoriesRepositoryModel {
  async execute(userId: UserId): Promise<Category[]> {
    const model = CategoryModel()
    try {
      return await super.execute(userId, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}