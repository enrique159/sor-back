import mongoose from 'mongoose'
import { encryptPassword } from '@/utils/encryptPassword'
import { User } from '../domain/interfaces/Users'

export const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
},{ versionKey: false, timestamps: true })

// This is a mongoose middleware that will be executed before the user is saved
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  this.password = encryptPassword(this.password)
  next()
})

// This is a mongoose middleware that will be executed before the user is updated
UserSchema.pre('updateOne', function(next) {
  // @ts-ignore
  if (!this._update.$set.password) next()
  // @ts-ignore
  this._update.$set.password = encryptPassword(this._update.$set.password)
  next()
})
