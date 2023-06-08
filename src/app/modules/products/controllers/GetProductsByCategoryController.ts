import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import GetProductsByCategoryUseCase from '../useCases/GetProductsByCategory.useCase'

export default class GetProductsByCategoryController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)
    const getProductsByCategoryUseCase = new GetProductsByCategoryUseCase()
    await getProductsByCategoryUseCase.execute({ userId: decodedToken._id, categoryId: req.body.categoryId })
      .then((products) => {
        logger({ HttpType: 'GET', route: '/products/by-category', useremail: decodedToken.email, success: true })
        res.status(201).json({ data: products })
      }).catch((err) => {
        logger({ HttpType: 'GET', route: '/products/by-category', useremail: decodedToken.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}