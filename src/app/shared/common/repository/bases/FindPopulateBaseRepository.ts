import { Model } from 'mongoose'
import { IDBConnectionManager } from '@shared/database/interfaces/IDBConnectionManager'
import { MongooseConnectionStatus } from '@shared/database/interfaces/MongooseStatus'
import { DatabaseTypes } from '@shared/database/interfaces/DatabaseTypes'
import IFindPopulateBaseRepository from '../interfaces/IFindPopulateBaseRepository'

export default class FindBaseRepository<U, T> implements IFindPopulateBaseRepository<U, T> {
  protected DBConnectionManager: IDBConnectionManager

  constructor(DBConnectionManager: IDBConnectionManager) {
    this.DBConnectionManager = DBConnectionManager
  }

  public async execute(modelClass: Model<U>, modelClassChild: Model<T>): Promise<U[]> {
    if (process.env.DATABASE_TYPE === DatabaseTypes.MONGO) {
      if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[1]) {
        const modelParent = modelClass
        const modelChild = modelClassChild
        const result = await modelParent.find()
        return result
      } else if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[0]) {
        throw new Error('Database is disconnected')
      }
    }
  }
}