import mongoose from 'mongoose'
import { Rpv } from '../domain/interfaces'
import { encryptPassword } from '@/utils/encryptPassword'

export const RpvSchema = new mongoose.Schema<Rpv>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  alias: { type: String, required: true },
  password: { type: String, required: true },
  installed: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurants', required: true },
},{ versionKey: false, timestamps: true })

// This is a mongoose middleware that will be executed before the Rpv is saved
RpvSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  this.password = encryptPassword(this.password)
  next()
})

// This is a mongoose middleware that will be executed before the user is updated
RpvSchema.pre('updateOne', function(next) {
  // @ts-ignore
  if (!this._update.$set.password) next()
  // @ts-ignore
  this._update.$set.password = encryptPassword(this._update.$set.password)
  next()
})