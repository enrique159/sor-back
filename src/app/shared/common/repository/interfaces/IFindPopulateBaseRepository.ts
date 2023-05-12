import { Model } from 'mongoose'

export default interface IFindPopulateBaseRepository<U,T> {
  execute(modelClass: Model<U>, modelClassChild: Model<T>): Promise<U[]>;
}