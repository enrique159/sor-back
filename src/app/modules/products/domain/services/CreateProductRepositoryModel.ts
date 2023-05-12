import { Product } from '../interfaces'

export interface CreateProductRepositoryModel {
  execute(payload: Product): Promise<Product>;
}