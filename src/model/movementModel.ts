import { prisma } from '../prisma-client'

export class MovementModel {
  static async getMovement({
    idMovement,
    user
  }: {
    idMovement: string
    user: string
  }) {
    const result = await prisma.movement.findFirst({
      where: {
        userId: user,
        idMovement
      }
    })
    return result
  }

  static async createMovement({
    user,
    typeMovement,
    description,
    amount
  }: {
    user: string
    typeMovement: number
    description: string
    amount: number
  }) {
    const result = await prisma.movement.create({
      data: {
        typeId: typeMovement,
        userId: user,
        description,
        value: amount
      }
    })

    return result
  }
}
