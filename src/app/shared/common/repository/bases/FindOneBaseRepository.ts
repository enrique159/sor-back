import { Model } from 'mongoose'
import { IDBConnectionManager } from '@shared/database/interfaces/IDBConnectionManager'
import IFindOneBaseRepository from '@shared/common/repository/interfaces/IFindOneBaseRepository'
import { MongooseConnectionStatus } from '@shared/database/interfaces/MongooseStatus'
import { DatabaseTypes } from '@shared/database/interfaces/DatabaseTypes'

export default class FindOneBaseRepository<T, U> implements IFindOneBaseRepository<T, U> {
  protected DBConnectionManager: IDBConnectionManager

  constructor(DBConnectionManager: IDBConnectionManager) {
    this.DBConnectionManager = DBConnectionManager
  }

  public async execute(item: T, modelClass: Model<U>): Promise<U> {
    if (process.env.DATABASE_TYPE === DatabaseTypes.MONGO) {
      if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[1]) {
        const model = modelClass
        const result = await model.findOne(item)
        return result
      } else if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[0]) {
        throw new Error('Database is disconnected')
      }
    }
  }
}
