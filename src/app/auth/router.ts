import express from 'express'
import VerifyAuthMiddleware from '../middlewares/verifyAuth/verifyAuthMiddleware'
import SignInController from './controller/SignInController'
import SignOutController from './controller/SignOutController'
import IsAuthController from './controller/IsAuthController'

export const AuthRoutes = () => {
  const router = express.Router()
  // Controllers
  const signInController = new SignInController()
  const signOutController = new SignOutController()
  const isAuthController = new IsAuthController()
  // Middleware
  const verifyAuthMiddleware = new VerifyAuthMiddleware()
  // Create New User
  router.post('/signin', signInController.execute)
  router.get('/signout', signOutController.execute)
  router.get('/isauth', verifyAuthMiddleware.execute, isAuthController.execute)

  return router
}