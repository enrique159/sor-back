import mongoose from 'mongoose'
import { Restaurant } from '../domain/interfaces'
import { RestaurantSchema } from './schema'

export const RestaurantModel = () => {
  return mongoose.model<Restaurant>('restaurants', RestaurantSchema)
}