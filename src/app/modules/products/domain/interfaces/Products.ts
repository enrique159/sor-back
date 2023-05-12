import { Types } from 'mongoose'

export interface Products {
  products: Product[]
}

export interface Product {
  _id?: string
  name: string
  description?: string
  price: number
  categoryId: string
  userId: Types.ObjectId
}