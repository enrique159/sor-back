import { Model } from 'mongoose'
import { IDBConnectionManager } from '@shared/database/interfaces/IDBConnectionManager'
import { MongooseConnectionStatus } from '@shared/database/interfaces/MongooseStatus'
import { DatabaseTypes } from '@shared/database/interfaces/DatabaseTypes'
import IFindPopulateByParamsBaseRepository from '../interfaces/IFindPopulateByParamsBaseRepository'

export default class FindPopulateByParamsBaseRepository<V,U,T,W> implements IFindPopulateByParamsBaseRepository<V,U,T,W> {
  protected DBConnectionManager: IDBConnectionManager

  constructor(DBConnectionManager: IDBConnectionManager) {
    this.DBConnectionManager = DBConnectionManager
  }

  public async execute(item: V, modelClass: Model<U>, modelClassChild: Model<T>): Promise<W> {
    if (process.env.DATABASE_TYPE === DatabaseTypes.MONGO) {
      if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[1]) {
        const modelParent = modelClass
        const modelChild = modelClassChild
        const resultParent = await modelParent.find(item).exec()
        const resultChild = await modelChild.find(item).exec()
        return { resultParent, resultChild } as W
      } else if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[0]) {
        throw new Error('Database is disconnected')
      }
    }
  }
}