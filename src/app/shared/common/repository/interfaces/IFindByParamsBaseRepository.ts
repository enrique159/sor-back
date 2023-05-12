import { Model } from 'mongoose'

export default interface IFindByParamsBaseRepository<T, U> {
  execute(item: T, modelClass: Model<U>): Promise<U[]>;
}