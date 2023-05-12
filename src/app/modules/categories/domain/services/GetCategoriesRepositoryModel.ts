import { UserId } from '@/app/modules/users/domain/interfaces'
import { Category } from '../interfaces/index'

export interface GetCategoriesRepositoryModel {
  execute(userId: UserId): Promise<Category[]>;
}