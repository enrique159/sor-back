import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { CreateRestaurantRepository } from '../repository/CreateRestaurantRepository'
import { Restaurant } from '../domain/interfaces'

export default class CreateRestaurantUseCase implements BaseUseCase<Restaurant, Promise<Restaurant>> {
  async execute(payload: Restaurant): Promise<Restaurant> {
    const connection = await DBConnectionManager.getInstance()
    const repository = new CreateRestaurantRepository(connection)
    const response = await repository.execute(payload)
    return response
  }
}