import { Types } from 'mongoose'
import { RpvType } from './Rpv'

export interface AuthRpv {
  alias: string
  password: string
}

export interface InstallRpvResponse {
  token: string
  rpv: AuthRpvResponse
}

export interface AuthRpvResponse {
  _id: string
  name: string
  type: RpvType
  description?: string
  alias: string
  restaurantId: Types.ObjectId
}