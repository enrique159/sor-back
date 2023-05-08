import ICreateOneBaseRepository from '@shared/common/repository/interfaces/ICreateOneBaseRepository.js'
import { MongooseConnectionStatus } from '@shared/database/interfaces/MongooseStatus.js'

import { Model } from 'mongoose'
import DBConnectionManager from '@shared/database/services/DBConnectionManager.js'
import { IDBConnectionManager } from '@shared/database/interfaces/IDBConnectionManager.js'
import { DatabaseTypes } from '@shared/database/interfaces/DatabaseTypes.js'

export default class CreateOneBaseRepository<T> implements ICreateOneBaseRepository<T> {
  protected DBConnectionManager: DBConnectionManager

  constructor(DBConnectionManager: IDBConnectionManager) {
    this.DBConnectionManager = DBConnectionManager
  }

  public async execute(item: Partial<T>, modelClass: Model<T>): Promise<T> {
    if (process.env.DATABASE_TYPE === DatabaseTypes.MONGO) {
      if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[1]) {
        const model = modelClass
        const result = await model.create(item)
        return result
      } else if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[0]) {
        throw new Error('Database is disconnected')
      }
    }
  }
}