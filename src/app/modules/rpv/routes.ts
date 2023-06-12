import express from 'express'
import CreateRpvController from './controllers/CreateRpvController'
import VerifyAuthMiddleware from '@app/middlewares/verifyAuth/verifyAuthMiddleware'
import InstallRpvController from './controllers/InstallRpvController'

export const RpvRoutes = () => {
  const router = express.Router()
  // Controllers
  const createRpvController = new CreateRpvController()
  const installRpvController = new InstallRpvController()
  // Middleware
  const verifyAuthMiddleware = new VerifyAuthMiddleware()

  // CREATE
  router.post('/', verifyAuthMiddleware.execute, createRpvController.execute)
  // GET ALL
  router.get('/', verifyAuthMiddleware.execute, (req, res) => res.status(200).json({ message: 'Route GET' }))
  // GET ONE
  router.get('/:id', verifyAuthMiddleware.execute, (req, res) => res.status(200).json({ message: 'Route GET ONE' }))
  // INSTALL
  router.post('/install', installRpvController.execute)
  // UPDATE
  router.put('/:id', verifyAuthMiddleware.execute, (req, res) => res.status(200).json({ message: 'Route PUT' }))
  // DELETE
  router.delete('/:id', verifyAuthMiddleware.execute, (req, res) => res.status(200).json({ message: 'Route DELETE' }))

  return router
}