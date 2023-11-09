import { auth } from 'express-oauth2-jwt-bearer'
import jwt from 'jsonwebtoken'
import { AUTH0_AUDIENCE, AUTH0_DOMAIN, PUBLIC_KEY } from '../constant/cons'
import type { DecodedToken, RequestWithUser } from '../types'
import type { NextFunction } from 'express'

export const validateAccessToken = auth({
  issuerBaseURL: `https://${AUTH0_DOMAIN}`,
  audience: AUTH0_AUDIENCE,
  secret: ''
})

// interface RequestWithUser extends Request {
//   user?: string
// }

export const decodeToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req?.headers?.authorization
    if (
      authorizationHeader === undefined ||
      !authorizationHeader.startsWith('Bearer ')
    ) {
      // @ts-expect-error idk
      return res.statusText(401).json({ message: 'Token de acceso no proporcionado' })
    }

    const token = authorizationHeader.split(' ')[1]
    if (token === undefined) {
      // @ts-expect-error idk
      return res.status(401).json({ message: 'Token de acceso no válido' })
    }

    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    }) as DecodedToken

    req.user = decoded.id_user
    next()
  } catch (error) {
    console.error(error)
    // @ts-expect-error idk
    return res.status(401).json({ message: 'Token de acceso no válido' })
  }
}
