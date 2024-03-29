import { MovementModel } from '../model/movementModel'
import type { ControllerFunction } from '../types'

export class MovementController {
  static getMovements: ControllerFunction = async (req, res) => {
    const user = req.user
    const { limit } = req.query

    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a id on the query params')
      return
    }

    const result = await MovementModel.getMovements({
      user: user.toLocaleString(),
      limit: limit === undefined ? undefined : Number(limit)
    })

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(200).json(result)
  }

  static getMovementByID: ControllerFunction = async (req, res) => {
    console.log('hola')

    const { id } = req.params
    const user = req.user

    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a id on the query params')
      return
    }

    const result = await MovementModel.getMovement({
      user: user.toLocaleString(),
      idMovement: id
    })
    console.log(result)

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(200).json(result)
  }

  static getMovementsByDate: ControllerFunction = async (req, res) => {
    const { initialDate, finalDate } = req.query
    const user = req.user

    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a id on the query params')
      return
    }

    if (initialDate === undefined || initialDate === null) {
      res.status(404).send('Its necessary a initialDate on the query params')
      return
    }

    const initialDateParsed = new Date(initialDate as string)
    const finalDateParsed = new Date(
      (finalDate as string) ?? (initialDate as string)
    )
    const result = await MovementModel.getMovementsByDate({
      initialDate: initialDateParsed,
      finalDate: finalDateParsed,
      user
    })

    res.status(200).json(result)
  }

  static createMovement: ControllerFunction = async (req, res) => {
    const user = req.user
    const { date, typeMovement, description, amount, methodPayment, category } =
      req.body
    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a id on the query params')
      return
    }
    let result
    const categoryId =
      category === null || typeMovement === '1' ? null : Number(category)
    try {
      result = await MovementModel.createMovement({
        date,
        user: user.toLocaleString(),
        typeMovement: Number(typeMovement),
        description,
        amount: Number(amount),
        methodPayment: Number(methodPayment),
        category: categoryId
      })
    } catch (error) {
      console.log(error)
      res.status(404).send('ERROR PROBANDO')
    }

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(201).json(result)
  }

  static deleteMovement: ControllerFunction = async (req, res) => {
    const user = req.user
    const { id } = req.params

    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a id on the query params')
      return
    }

    const result = await MovementModel.deleteMovement({
      idMovement: id,
      user: user.toLocaleString()
    })

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(201).json(result)
  }

  static updateMovement: ControllerFunction = async (req, res) => {
    const user = req.user
    const { id } = req.params
    const {
      createdAt,
      typeId,
      description,
      value,
      methodPaymentId,
      categoryId
    } = req.body

    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a id on the query params')
      return
    }

    const category =
      categoryId === null || typeId === '1' ? null : Number(categoryId)
    const result = await MovementModel.updateMovement(user.toLocaleString(), {
      idMovement: id,
      createdAt,
      typeId: Number(typeId),
      description,
      value: Number(value),
      methodPaymentId: Number(methodPaymentId),
      categoryId: category
    })

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(200).json(result)
  }
}
