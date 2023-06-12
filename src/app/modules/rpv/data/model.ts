import mongoose from 'mongoose'
import { Rpv } from '../domain/interfaces'
import { RpvSchema } from './schema'

export const RpvModel = () => {
  return mongoose.model<Rpv>('rpv', RpvSchema)
}