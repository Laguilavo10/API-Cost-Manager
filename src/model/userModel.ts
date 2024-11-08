import { prisma } from '../prisma-client'

export class UserModel {
  static async registerNew({
    email,
    username,
    name
  }: {
    email: string
    username: string
    name: string
  }) {
    const result = await prisma.user.upsert({
      where: {
        email
      },
      update: {}, // Puedes especificar aquí los campos que deseas actualizar si el usuario ya existe
      create: {
        email,
        username,
        name
      }
    })
    return result
  }
}
