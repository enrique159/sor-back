import { CreateRestaurantRepositoryModel } from '../domain/services/CreateRestaurantRepositoryModel'
import { RestaurantModel } from '../data/model'
import { Restaurant } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { CreateOneBaseRepository } from '@shared/common/repository'

export class CreateRestaurantRepository extends CreateOneBaseRepository<Restaurant> implements CreateRestaurantRepositoryModel {
  async execute(item: Restaurant): Promise<Restaurant> {
    const model = RestaurantModel()
    try {
      return await super.execute(item, model)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}