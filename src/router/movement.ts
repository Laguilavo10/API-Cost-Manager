import { Router } from 'express'
import { MovementController } from '../controller/movementController'

export const movementRouter = Router()

movementRouter.get('/', MovementController.getMovements)
movementRouter.get('/date', MovementController.getMovementsByDate)
movementRouter.get('/:id', MovementController.getMovementByID)
movementRouter.post('/', MovementController.createMovement)
movementRouter.put('/update/:id', MovementController.updateMovement)
movementRouter.delete('/:id', MovementController.deleteMovement)
