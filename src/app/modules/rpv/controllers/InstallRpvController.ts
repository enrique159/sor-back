import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { AuthRpv } from '../domain/interfaces'
import InstallRpvUseCase from '../useCases/InstallRpv.useCase'

export default class InstallRpvController {
  async execute(req: Request, res: Response) {
    const payload: AuthRpv = {
      alias: req.body.alias,
      password: req.body.password,
    }

    const useCase = new InstallRpvUseCase()
    await useCase.execute(payload)
      .then((response) => {
        logger({ HttpType: 'POST', route: '/rpv/install', useremail: response.rpv.alias, success: true })
        res.status(200).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/rpv/install', useremail: req.body.alias ?? '', success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}