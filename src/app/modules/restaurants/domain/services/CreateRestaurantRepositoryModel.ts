import { Restaurant } from '../interfaces'

export interface CreateRestaurantRepositoryModel {
  execute(payload: Restaurant): Promise<Restaurant>
}