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

  static getCategoriesAmount: ControllerFunction = async (req, res) => {
    const user = req.user

    const { initialDate, finalDate } = req.query

    if (initialDate === undefined || initialDate === null) {
      res.status(404).send('Its necessary a initialDate on the query params')
      return
    }

    const initialDateParsed = new Date(initialDate as string)
    const finalDateParsed = new Date(
      (finalDate as string) ?? (initialDate as string)
    )

    const result = await CategoryModel.getCategoriesAmount({
      user: user.toLocaleString(),
      initialDate: initialDateParsed,
      finalDate: finalDateParsed
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
