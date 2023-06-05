import express from 'express'
import VerifyAuthMiddleware from '../../middlewares/verifyAuth/verifyAuthMiddleware'
import CreateUserController from './controllers/CreateUserController'
import GetMeController from './controllers/GetMeController'

export const UserRoutes = () => {
  const router = express.Router()
  // Controllers
  const createUserController = new CreateUserController()
  const getMeController = new GetMeController()
  // Middleware
  const verifyAuthMiddleware = new VerifyAuthMiddleware()

  // Create New User
  router.post('/create', createUserController.execute)
  // Get Me
  router.get('/me', verifyAuthMiddleware.execute, getMeController.execute)
  // Testing middleware
  router.get('/testing', verifyAuthMiddleware.execute, (req, res) => {
    res.send('Hello World!')
  })

  return router
}