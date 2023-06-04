import { IAddress } from '@/app/shared/common/domain/IAddress'
import { IWeekDay } from '@/app/shared/common/domain/IDateTime'
import { IPaymentMethods } from '@/app/shared/common/domain/IPaymentMethods'
import { ITax } from '@/app/shared/common/domain/ITaxes'
import { Types } from 'mongoose'

export interface Restaurants {
  restaurants: Restaurant[]
}

export interface Restaurant {
  _id?: string
  name: string
  description?: string
  address: IAddress
  logo?: string
  mainRestaurant: boolean
  // Options for attending the restaurant
  deliveryMode: boolean
  takeAwayMode: boolean
  dineInMode: boolean
  // Options for paying the restaurant
  paymentMethods: IPaymentMethods
  // Options for the restaurant
  openDayTime: Map<IWeekDay, { open: string, close: string }>
  timezone: string
  // Ticket options
  logoTicket?: string
  nameTicket?: string
  addresTicket?: string
  phoneTicket?: string
  socialTicket?: Map<string, string>
  customTextTicket?: string
  policiesTextTicket?: string
  // Options for the fiscal data
  fiscalData: {
    rfc: string
    businessAddress: IAddress
    taxes: ITax[]
  }
  // Options for the restaurant
  active: boolean
  userId: Types.ObjectId
}