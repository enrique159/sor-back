import { Types } from 'mongoose'

export interface Rpvs {
  rpvs: Rpv[]
}

export interface Rpv {
  _id?: string
  name: string
  type: RpvType
  description?: string
  alias: string
  password: string
  // Options for the Rpv
  installed: boolean
  active: boolean
  restaurantId: Types.ObjectId
}


export enum RpvTypes {
  CAJA = 'CAJA',
  COCINA = 'COCINA',
  BARRA = 'BARRA',
  MESAS = 'MESAS',
  BODEGA = 'BODEGA',
  ALMACEN = 'ALMACEN',
  ADMINISTRACION = 'ADMINISTRACION',
  LIMPIEZA = 'LIMPIEZA',
  SERVICIOS = 'SERVICIOS',
  OTROS = 'OTROS'
}

export type RpvType = keyof typeof RpvTypes