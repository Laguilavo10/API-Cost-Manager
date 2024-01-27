import { Router } from 'express'
import { CategoryController } from '../controller/categoriesController'

export const categoriesRouter = Router()

categoriesRouter.get('/', CategoryController.getCategories)
categoriesRouter.put('/limit', CategoryController.updateMovement)
