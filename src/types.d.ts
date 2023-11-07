import type { Request, Response, NextFunction } from 'express'

export type ControllerFunction<T = void> = (
  req: Request,
  res: Response
) => Promise<T>

export type ControllerMiddleware<T = void> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>

export interface Movement {
  idMovement: string
  userId: string
  typeId: TypeMovement
  createdAt: Date | string
  description: string
  value: number
  methodPaymentId: MethodPayment
}
