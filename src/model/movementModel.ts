import { prisma } from '../prisma-client'
import type { Movement } from '../types'

export class MovementModel {
  static async getMovements({ user, limit }: { user: string; limit?: number }) {
    if (limit === undefined) {
      const result = await prisma.movement.findMany({
        where: {
          userId: user
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return result
    }

    const result = await prisma.movement.findMany({
      where: {
        userId: user
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })
    return result
  }

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

  static async getMovementsByDate({
    initialDate,
    finalDate,
    user
  }: {
    initialDate: Date
    finalDate: Date
    user: string
  }) {
    const result = await prisma.movement.findMany({
      where: {
        userId: user,
        createdAt: {
          gte: initialDate,
          lte: finalDate
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return result
  }

  static async createMovement({
    date,
    user,
    typeMovement,
    description,
    amount,
    methodPayment,
    category
  }: {
    date?: Date
    user: string
    typeMovement: number
    description: string
    amount: number
    methodPayment: number
    category: number | null
  }) {
    const result = await prisma.movement.create({
      data: {
        userId: user,
        createdAt: date ?? new Date(),
        typeId: typeMovement,
        description,
        value: amount,
        methodPaymentId: methodPayment,
        categoryId: category
      }
    })
    return result
  }

  static async updateMovement(user: string, newData: Omit<Movement, 'userId'>) {
    const result = await prisma.movement.update({
      where: {
        userId: user,
        idMovement: newData.idMovement
      },
      data: {
        createdAt: newData.createdAt,
        typeId: newData.typeId,
        description: newData.description,
        value: newData.value,
        methodPaymentId: newData.methodPaymentId,
        categoryId: newData.categoryId
      }
    })

    return result
  }

  static async deleteMovement({
    idMovement,
    user
  }: {
    idMovement: string
    user: string
  }) {
    const result = await prisma.movement.delete({
      where: {
        idMovement,
        userId: user
      }
    })

    return result
  }
}
