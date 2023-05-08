import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { Category } from '../domain/interfaces/Categories'
import CreateCategoryUseCase from '../useCases/CreateCategory.useCase'
import { decodeToken } from '@/plugins/jwt/decodeToken'


export default class CreateCategorieController {
  async execute(req: Request, res: Response) {
    const category: Category = {
      name: req.body.name,
      description: req.body.description,
      icon: req.body.icon || 'ti-package',
      color: req.body.color || '#000000',
    }
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const createCategoryUseCase = new CreateCategoryUseCase()
    await createCategoryUseCase.execute(category)
      .then((category) => {
        logger({ HttpType: 'POST', route: '/categories/create', useremail: decodedToken.email, success: true })
        res.status(201).json(category)
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/categories/create', useremail:  decodedToken.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}