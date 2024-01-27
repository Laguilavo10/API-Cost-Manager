import { Router } from 'express'
import { CategoryController } from '../controller/categoriesController'

export const categoriesRouter = Router()

categoriesRouter.get('/', CategoryController.getCategories)
categoriesRouter.get('/amount', CategoryController.getCategoriesAmount)
categoriesRouter.put('/limit', CategoryController.updateMovement)
