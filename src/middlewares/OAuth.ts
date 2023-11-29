import { auth } from 'express-oauth2-jwt-bearer'
import jwt from 'jsonwebtoken'
import { AUTH0_AUDIENCE, AUTH0_DOMAIN, PUBLIC_KEY } from '../constant/cons'
import type { DecodedToken, RequestWithUser } from '../types'
import type { NextFunction, Request, Response } from 'express'

export const validateAccessToken = auth({
  issuerBaseURL: `https://${AUTH0_DOMAIN}`,
  audience: AUTH0_AUDIENCE,
  secret: ''
})

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authorizationHeader = req?.headers?.authorization
    if (
      authorizationHeader === undefined ||
      !authorizationHeader.startsWith('Bearer ')
    ) {
      return res
        .status(401)
        .json({ message: 'Token de acceso no proporcionado' })
    }

    const token = authorizationHeader.split(' ')[1]
    if (token === undefined) {
      return res.status(401).json({ message: 'Token de acceso no válido' })
    }

    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    }) as DecodedToken

    (req as RequestWithUser).user = decoded.id_user
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'Token de acceso no válido' })
  }
}
