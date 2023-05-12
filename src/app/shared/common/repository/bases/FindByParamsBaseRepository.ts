import { Model } from 'mongoose'
import { IDBConnectionManager } from '@shared/database/interfaces/IDBConnectionManager'
import { MongooseConnectionStatus } from '@shared/database/interfaces/MongooseStatus'
import IFindByParamsBaseRepository from '../interfaces/IFindByParamsBaseRepository'
import { DatabaseTypes } from '@shared/database/interfaces/DatabaseTypes'

export default class FindByParamsBaseRepository<T, U> implements IFindByParamsBaseRepository<T, U> {
  protected DBConnectionManager: IDBConnectionManager

  constructor(DBConnectionManager: IDBConnectionManager) {
    this.DBConnectionManager = DBConnectionManager
  }

  public async execute(item: T, modelClass: Model<U>): Promise<U[]> {
    if (process.env.DATABASE_TYPE === DatabaseTypes.MONGO) {
      if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[1]) {
        const model = modelClass
        const result = await model.find(item).exec()
        return result
      } else if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[0]) {
        throw new Error('Database is disconnected')
      }
    }
  }
}