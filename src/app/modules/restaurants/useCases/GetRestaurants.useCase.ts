import { BaseUseCase } from '@shared/common/BaseUseCase'
import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { GetRestaurantsRepository } from '../repository/GetRestaurantsRepository'
import { Restaurant } from '../domain/interfaces'

export default class GetRestaurantsUseCase implements BaseUseCase<string, Promise<Restaurant[]>> {

  async execute(id: string): Promise<Restaurant[]> {
    const dbConnectionManager = DBConnectionManager.getInstance()
    const getRestaurantsRepository = new GetRestaurantsRepository(dbConnectionManager)
    const restaurants = await getRestaurantsRepository.execute({ userId: id })
    return restaurants
  }
}