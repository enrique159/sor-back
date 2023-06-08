import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { Category } from '../domain/interfaces/Categories'
import CreateCategoryUseCase from '../useCases/CreateCategory.useCase'
import { decodeToken } from '@/plugins/jwt/decodeToken'


export default class CreateCategorieController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const category: Category = {
      name: req.body.name,
      description: req.body.description,
      icon: req.body.icon,
      color: req.body.color,
      userId: decodedToken._id,
    }

    const createCategoryUseCase = new CreateCategoryUseCase()
    await createCategoryUseCase.execute(category)
      .then((category) => {
        logger({ HttpType: 'POST', route: '/categories/create', useremail: decodedToken.email, success: true })
        res.status(201).json({ data: category })
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/categories/create', useremail:  decodedToken.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}