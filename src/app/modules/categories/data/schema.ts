import mongoose from 'mongoose'
import { Category } from '../domain/interfaces'

export const CategorySchema = new mongoose.Schema<Category>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
    default: 'fa-pan-food',
  },
  color: {
    type: String,
    default: '#C3E9DE',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
},{ versionKey: false, timestamps: true })