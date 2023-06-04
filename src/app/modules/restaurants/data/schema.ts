import mongoose from 'mongoose'
import { Restaurant } from '../domain/interfaces'

export const RestaurantSchema = new mongoose.Schema<Restaurant>({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: Object, required: true },
  logo: { type: String },
  mainRestaurant: { type: Boolean, default: false },
  deliveryMode: { type: Boolean, default: false },
  takeAwayMode: { type: Boolean, default: false },
  dineInMode: { type: Boolean, default: false },
  paymentMethods: { type: Object, required: true },
  openDayTime: { type: Map, required: true },
  timezone: { type: String, required: true },
  logoTicket: { type: String },
  nameTicket: { type: String },
  addresTicket: { type: String },
  phoneTicket: { type: String },
  socialTicket: { type: Map },
  customTextTicket: { type: String },
  policiesTextTicket: { type: String },
  fiscalData: { type: Object, required: true },
  active: { type: Boolean, default: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
},{ versionKey: false, timestamps: true })