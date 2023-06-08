import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import GetMeUseCase from '../useCases/GetMe.useCase'

export default class GetMeController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const useCase = new GetMeUseCase()
    await useCase.execute({ _id: decodedToken._id })
      .then((response) => {
        logger({ HttpType: 'GET', route: '/users/me', useremail: decodedToken.email, success: true })
        res.status(200).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'GET', route: '/users/me', useremail: decodedToken.email, success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}