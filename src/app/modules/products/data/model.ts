import mongoose from 'mongoose'
import { Product } from '../domain/interfaces'
import { ProductSchema } from './schema'

export const ProductModel = () => {
  return mongoose.model<Product>('products', ProductSchema)
}