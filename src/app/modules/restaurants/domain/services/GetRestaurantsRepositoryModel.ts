import { UserId } from '@/app/modules/users/domain/interfaces'
import { Restaurant } from '../interfaces/index'

export interface GetRestaurantsRepositoryModel {
  execute(userId: UserId): Promise<Restaurant[]>;
}