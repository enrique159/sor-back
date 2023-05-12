import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { Product } from '../domain/interfaces'
import CreateProductUseCase from '../useCases/CreateProduct.useCase'
import { decodeToken } from '@/plugins/jwt/decodeToken'


export default class CreateProductController {
  async execute(req: Request, res: Response) {
    const product: Product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      categoryId: req.body.categoryId,
    }
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const createProductUseCase = new CreateProductUseCase()
    await createProductUseCase.execute(product)
      .then((product) => {
        logger({ HttpType: 'POST', route: '/products/create', useremail: decodedToken.email, success: true })
        res.status(201).json(product)
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/products/create', useremail:  decodedToken.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}