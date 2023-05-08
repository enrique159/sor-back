import express from 'express'
import VerifyAuthMiddleware from '@app/middlewares/verifyAuth/verifyAuthMiddleware'
import CreateCategorieController from './controllers/CreateCategorieController'
import GetCategoriesController from './controllers/GetCategoriesController'

export const CategoriesRoutes = () => {
  const router = express.Router()
  // Controllers
  const createCategorieController = new CreateCategorieController()
  const getCategoriesController = new GetCategoriesController()
  // Middleware
  const verifyAuthMiddleware = new VerifyAuthMiddleware()
  // Create New Categorie
  router.post('/create', verifyAuthMiddleware.execute, createCategorieController.execute)
  // Get All Categories
  router.get('/', verifyAuthMiddleware.execute, getCategoriesController.execute)

  return router
}