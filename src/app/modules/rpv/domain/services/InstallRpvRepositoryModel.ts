import { QueryParams } from '@/app/auth/domain/interfaces'
import { Rpv } from '../interfaces'

export interface InstallRpvRepositoryModel {
  execute(payload: QueryParams): Promise<Rpv>
}