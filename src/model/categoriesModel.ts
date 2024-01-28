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

  static async getCategoriesAmount({
    user,
    initialDate,
    finalDate
  }: {
    user: string
    initialDate: Date
    finalDate: Date
  }) {
    const result = await prisma.$queryRaw`
      SELECT c.idCategory as categoryId, c.name, COALESCE(SUM(m.value), 0) as amount, cu.limit
        FROM Movement m
        RIGHT JOIN Category c ON m.categoryId = c.idCategory AND m.userId = ${user} AND m.createdAt >= ${initialDate} AND m.createdAt <= ${finalDate} AND m.typeId = 2
        LEFT JOIN categoryperuser cu ON  cu.categoryId = c.idCategory and cu.userId = ${user}
        GROUP BY c.idCategory;
      `
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
