import { Rpv } from '../interfaces'

export interface CreateRpvRepositoryModel {
  execute(payload: Rpv): Promise<Rpv>
}