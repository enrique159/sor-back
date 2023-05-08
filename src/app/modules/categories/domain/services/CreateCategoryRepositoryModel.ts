import { Category } from '../interfaces/Categories'

export interface CreateCategoryRepositoryModel {
  execute(payload: Category): Promise<Category>;
}