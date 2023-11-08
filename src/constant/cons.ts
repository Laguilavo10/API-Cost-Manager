import fs from 'node:fs'

export const JWT_SECRET = process.env.JWT_SECRET ?? ''
export const JWT_KID = process.env.JWT_KID ?? ''
export const PUBLIC_KEY = fs.readFileSync('./src/public_key.pem', 'utf8') ?? ''
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE ?? ''
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN ?? ''
