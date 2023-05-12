import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import GetProductsUseCase from '../useCases/GetProducts.useCase'


export default class GetProductsController {

  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const getProductsUseCase = new GetProductsUseCase()
    await getProductsUseCase.execute(decodedToken._id)
      .then((products) => {
        logger({ HttpType: 'GET', route: '/products/', useremail: decodedToken.email, success: true })
        res.status(201).json(products)
      })
      .catch((err) => {
        logger({ HttpType: 'GET', route: '/products/', useremail:  decodedToken.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}