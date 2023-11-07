import { prisma } from '../prisma-client'

export class BalanceModel {
  static async getBalance({ year, month }: { year: number, month: number }) {
    const condition = isNaN(month) ? { year } : { year, month }
    const result = await prisma.balance.findMany({
      where: {
        earnings: { not: null },
        expenses: { not: null },
        ...condition
      }
    })
    return result
  }
}
