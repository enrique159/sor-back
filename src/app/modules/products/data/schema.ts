import mongoose from 'mongoose'
import { Product } from '../domain/interfaces'

export const ProductSchema = new mongoose.Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
},{ versionKey: false, timestamps: true })