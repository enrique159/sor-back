import { Model } from 'mongoose'
import { IDBConnectionManager } from '@shared/database/interfaces/IDBConnectionManager'
import { MongooseConnectionStatus } from '@shared/database/interfaces/MongooseStatus'
import IFindBaseRepository from '@shared/common/repository/interfaces/IFindBaseRepository'
import { DatabaseTypes } from '@shared/database/interfaces/DatabaseTypes'

export default class FindBaseRepository<U> implements IFindBaseRepository<U> {
  protected DBConnectionManager: IDBConnectionManager

  constructor(DBConnectionManager: IDBConnectionManager) {
    this.DBConnectionManager = DBConnectionManager
  }

  public async execute(modelClass: Model<U>): Promise<U[]> {
    if (process.env.DATABASE_TYPE === DatabaseTypes.MONGO) {
      if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[1]) {
        const model = modelClass
        const result = await model.find()
        return result
      } else if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[0]) {
        throw new Error('Database is disconnected')
      }
    }
  }
}