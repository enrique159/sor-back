import express from 'express'
import VerifyAuthMiddleware from '@app/middlewares/verifyAuth/verifyAuthMiddleware'
import CreateProductController from './controllers/CreateProductController'
import GetProductsController from './controllers/GetProductsController'
import GetProductsByCategoryController from './controllers/GetProductsByCategoryController'

export const ProductsRoutes = () => {
  const router = express.Router()
  // Controllers
  const createProductController = new CreateProductController()
  const getProductsController = new GetProductsController()
  const getProductsByCategoryController = new GetProductsByCategoryController()
  // Middleware
  const verifyAuthMiddleware = new VerifyAuthMiddleware()
  // Create New Product
  router.post('/create', verifyAuthMiddleware.execute, createProductController.execute)
  // Get All Product
  router.get('/', verifyAuthMiddleware.execute, getProductsController.execute)
  // Get all products by category
  router.get('/by-category', verifyAuthMiddleware.execute, getProductsByCategoryController.execute)

  return router
}