import { Router } from 'express'
import { BalanceController } from '../controller/balanceController'

export const balanceRouter = Router()

balanceRouter.get('/', BalanceController.getBalance)
