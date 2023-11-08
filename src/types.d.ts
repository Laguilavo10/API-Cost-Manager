import type { Request, Response, NextFunction } from 'express'

interface RequestWithUser extends Request {
  user?: string
}
export type ControllerFunction<T = void> = (
  req: RequestWithUser,
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

export interface DecodedToken {
  id_user: string
  iss: string
  sub: string
  aud: string[]
  iat: number
  exp: number
  azp: string
  scope: string
}
