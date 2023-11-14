import { prisma } from '../prisma-client'

export class BalanceModel {
  static async getBalance({
    year,
    month,
    user
  }: {
    year: number
    month: number
    user: string
  }) {
    const condition = isNaN(month) ? { year } : { year, month }
    const result = await prisma.balance.findMany({
      where: {
        earnings: { not: null },
        expenses: { not: null },
        userId: user,
        ...condition
      }
    })
    return result
  }
}
