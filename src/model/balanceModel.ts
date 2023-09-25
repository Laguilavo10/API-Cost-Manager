import { prisma } from '../prisma-client'

export class BalanceModel {
  static async getCurrentBalance({ user }: { user: string }) {
    const result = await prisma.balance.findFirst({
      where: {
        userId: user
      }
    })
    return result
  }
}
