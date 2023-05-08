import { Category } from '../interfaces/index'

export interface GetCategoriesRepositoryModel {
  execute(): Promise<Category[]>;
}