import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { CreateRpvRepository } from '../repository/CreateRpvRepository'
import { Rpv } from '../domain/interfaces'

export default class CreateRpvUseCase implements BaseUseCase<Rpv, Promise<Rpv>> {
  async execute(payload: Rpv): Promise<Rpv> {
    const connection = await DBConnectionManager.getInstance()
    const repository = new CreateRpvRepository(connection)
    const response = await repository.execute(payload)
    return response
  }
}