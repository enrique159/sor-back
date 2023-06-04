import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import { Restaurant } from '../domain/interfaces'
import CreateRestaurantUseCase from '../useCases/CreateRestaurant.useCase'

export default class CreateRestaurantController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const payload: Restaurant = {
      ...req.body,
      userId: decodedToken._id,
    }

    const useCase = new CreateRestaurantUseCase()
    await useCase.execute(payload)
      .then((response) => {
        logger({ HttpType: 'POST', route: '/', useremail: decodedToken.email, success: true })
        res.status(200).json(response)
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/', useremail: decodedToken.email, success: false, error: err[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}