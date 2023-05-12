import { Product } from '@/app/modules/products/domain/interfaces'
import { Types } from 'mongoose'

export interface Categories {
  categories: Category[]
}

export interface Category {
  _id?: string
  name: string
  description?: string
  icon?: string
  color?: string
  userId: Types.ObjectId
}

export interface CategoryWithProducts {
  _id?: string
  name: string
  description?: string
  icon?: string
  color?: string
  userId: Types.ObjectId
  products: Product[]
}