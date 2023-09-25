import { Router } from 'express'
import { MovementController } from '../controller/movementController'

export const movementRouter = Router()

movementRouter.get('/:id', MovementController.getMovementByID)
movementRouter.post('/', MovementController.createMovement)
