import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import { Rpv } from '../domain/interfaces'
import CreateRpvUseCase from '../useCases/CreateRpv.useCase'

export default class CreateRpvController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const payload: Rpv = {
      ...req.body,
    }

    const useCase = new CreateRpvUseCase()
    await useCase.execute(payload)
      .then((response) => {
        logger({ HttpType: 'POST', route: '/rpv', useremail: decodedToken.email, success: true })
        res.status(200).json({ data: response})
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/rpv', useremail: decodedToken.email, success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}