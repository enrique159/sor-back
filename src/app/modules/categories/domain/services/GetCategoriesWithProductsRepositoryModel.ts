import { UserId } from '@/app/modules/users/domain/interfaces'
import { Category } from '../interfaces'
import { Product } from '@/app/modules/products/domain/interfaces'

export interface CategoriesAndProducts {
  resultParent: Category[]
  resultChild: Product[]
}

export interface GetCategoriesWithProductsRepositoryModel {
  execute(userId: UserId): Promise<CategoriesAndProducts>;
}