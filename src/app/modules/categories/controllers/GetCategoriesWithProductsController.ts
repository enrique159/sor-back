import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import GetCategoriesWithProductsUseCase from '../useCases/GetCategoriesWithProducts.useCase'


export default class GetCategoriesWithProductsController {

  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const getCategoriesUseCase = new GetCategoriesWithProductsUseCase()
    await getCategoriesUseCase.execute(decodedToken._id)
      .then((categories) => {
        logger({ HttpType: 'GET', route: '/categories/products', useremail: decodedToken.email, success: true })
        res.status(201).json(categories)
      })
      .catch((err) => {
        logger({ HttpType: 'GET', route: '/categories/products', useremail:  decodedToken.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}