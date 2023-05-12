import { UserId } from '@app/modules/users/domain/interfaces'
import { Product } from '../interfaces'

export interface IParams {
  userId: UserId,
  categoryId: string
}

export interface GetProductsByCategoryRepositoryModel {
  execute(params: IParams): Promise<Product[]>;
}