import express from 'express'
import VerifyAuthMiddleware from '@app/middlewares/verifyAuth/verifyAuthMiddleware'
import CreateProductController from './controllers/CreateProductController'
import GetProductsController from './controllers/GetProductsController'

export const ProductsRoutes = () => {
  const router = express.Router()
  // Controllers
  const createProductController = new CreateProductController()
  const getProductsController = new GetProductsController()
  // Middleware
  const verifyAuthMiddleware = new VerifyAuthMiddleware()
  // Create New Product
  router.post('/create', verifyAuthMiddleware.execute, createProductController.execute)
  // Get All Product
  router.get('/', verifyAuthMiddleware.execute, getProductsController.execute)

  return router
}