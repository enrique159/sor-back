import express from 'express'

import { UserRoutes } from '../app/modules/users/routes'
import { CategoriesRoutes } from '../app/modules/categories/routes'
import { ProductsRoutes } from '../app/modules/products/routes'
import { RestaurantsRoutes } from '@/app/modules/restaurants/routes'
import { AuthRoutes } from '../app/auth/router'

export const Routes = () => {
  const router = express.Router()
  router.use('/users', UserRoutes())
  router.use('/categories', CategoriesRoutes())
  router.use('/products', ProductsRoutes())
  router.use('/restaurants', RestaurantsRoutes())
  router.use('/auth', AuthRoutes())
  return router
}