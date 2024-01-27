import { prisma } from '../prisma-client'

export class CategoryModel {
  static async getCategories({ user }: { user: string }) {
    const result = await prisma.categoryPerUser.findMany({
      where: {
        userId: user
      },
      orderBy: {
        categoryId: 'asc'
      }
    })
    return result
  }

  static async updateCategory({
    userId,
    categoryId,
    limit
  }: {
    userId: string
    categoryId: number
    limit: number
  }) {
    const result = await prisma.categoryPerUser.update({
      data: {
        limit
      },
      where: {
        userId_categoryId: {
          categoryId,
          userId
        }
      }
    })
    return result
  }
}
