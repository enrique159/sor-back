import mongoose from 'mongoose'
import { Category } from '../domain/interfaces/index'
import { CategorySchema } from './schema'

export const CategoryModel = () => {
  return mongoose.model<Category>('categories', CategorySchema)
}