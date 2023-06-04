import express from 'express'
import VerifyAuthMiddleware from '@app/middlewares/verifyAuth/verifyAuthMiddleware'
import GetRestaurantsController from './controllers/GetRestaurantsController'
import CreateRestaurantController from './controllers/CreateRestaurantController'

export const RestaurantsRoutes = () => {
  const router = express.Router()
  // Controllers
  const getRestaurantsController = new GetRestaurantsController()
  const createRestaurantController = new CreateRestaurantController()
  // Middleware
  const verifyAuthMiddleware = new VerifyAuthMiddleware()

  // Create New Restaurant
  router.post('/create', verifyAuthMiddleware.execute, createRestaurantController.execute)
  // Get All Restaurants
  router.get('/', verifyAuthMiddleware.execute, getRestaurantsController.execute)
  return router
}