import { Model } from 'mongoose'

export default interface IFindPopulateBaseRepository<V,U,T,W> {
  execute(item: V, modelClass: Model<U>, modelClassChild: Model<T>): Promise<W>;
}