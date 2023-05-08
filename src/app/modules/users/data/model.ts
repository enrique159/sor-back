import mongoose from 'mongoose'
import { User } from '../domain/interfaces/Users'
import { UserSchema } from './schema'

export const UserModel = () => {
  return mongoose.model<User>('users', UserSchema)
}