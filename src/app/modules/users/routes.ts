import express from 'express'
import VerifyAuthMiddleware from '../../middlewares/verifyAuth/verifyAuthMiddleware'
import CreateUserController from './controllers/CreateUserController'

export const UserRoutes = () => {
  const router = express.Router()
  // Controllers
  const createUserController = new CreateUserController()
  // Middleware
  const verifyAuthMiddleware = new VerifyAuthMiddleware()
  // Create New User
  router.post('/create', createUserController.execute)
  // Testing middleware
  router.get('/testing', verifyAuthMiddleware.execute, (req, res) => {
    res.send('Hello World!')
  })

  return router
}