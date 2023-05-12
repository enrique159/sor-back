import { UserId } from '@app/modules/users/domain/interfaces'
import { Product } from '../interfaces'

export interface GetProductsRepositoryModel {
  execute(userId: UserId): Promise<Product[]>;
}