import express from 'express'
import VerifyAuthMiddleware from '@app/middlewares/verifyAuth/verifyAuthMiddleware'
import CreateProductController from './controllers/CreateProductController'

export const ProductsRoutes = () => {
  const router = express.Router()
  // Controllers
  const createProductController = new CreateProductController()
  // Middleware
  const verifyAuthMiddleware = new VerifyAuthMiddleware()
  // Create New Product
  router.post('/create', verifyAuthMiddleware.execute, createProductController.execute)
  // Get All Product
  router.get('/', verifyAuthMiddleware.execute, (req, res) => res.send('Categories'))

  return router
}