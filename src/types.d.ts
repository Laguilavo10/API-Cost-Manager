import type { Request, Response } from 'express'

export type ControllerFunction<T = void> = (req: Request, res: Response) => Promise<T>
