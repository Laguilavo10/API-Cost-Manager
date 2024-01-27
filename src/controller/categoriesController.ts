import { CategoryModel } from '../model/categoriesModel'
import type { ControllerFunction } from '../types'

export class CategoryController {
  static getCategories: ControllerFunction = async (req, res) => {
    const user = req.user

    const result = await CategoryModel.getCategories({
      user: user.toLocaleString()
    })

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(200).json(result)
  }

  static updateMovement: ControllerFunction = async (req, res) => {
    const user = req.user
    const { categoryId, limit } = req.body

    const result = await CategoryModel.updateCategory({
      userId: user.toLocaleString(),
      categoryId: Number(categoryId),
      limit: Number(limit)
    })

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(200).json(result)
  }
}
