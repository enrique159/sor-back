import { FindByParamsBaseRepository } from '@/app/shared/common/repository'
import { RestaurantModel } from '../data/model'
import { Restaurant } from '../domain/interfaces'
import { GetRestaurantsRepositoryModel } from '../domain/services/GetRestaurantsRepositoryModel'
import { UserId } from '@/app/modules/users/domain/interfaces'
import { ErrorHandler } from '@/app/shared/error/ErrorHandler'

export class GetRestaurantsRepository extends FindByParamsBaseRepository<UserId, Restaurant> implements GetRestaurantsRepositoryModel {
  async execute(userId: UserId): Promise<Restaurant[]> {
    const model = RestaurantModel()
    try {
      return await super.execute(userId, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}