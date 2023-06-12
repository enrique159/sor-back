import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import GetRestaurantsUseCase from '../useCases/GetRestaurants.useCase'

export default class GetRestaurantsController {

  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const getRestaurantsUseCase = new GetRestaurantsUseCase()
    await getRestaurantsUseCase.execute(decodedToken._id)
      .then((restaurants) => {
        logger({ HttpType: 'GET', route: '/restaurants/', useremail: decodedToken.email, success: true })
        res.status(200).json({ data: restaurants })
      })
      .catch((err) => {
        logger({ HttpType: 'GET', route: '/restaurants/', useremail:  decodedToken.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}