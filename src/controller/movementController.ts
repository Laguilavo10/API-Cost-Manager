import { MovementModel } from '../model/movementModel'
import type { ControllerFunction } from '../types'

export class MovementController {
  static getMovementByID: ControllerFunction = async (req, res) => {
    const { id } = req.params
    const { user } = req.query

    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a id on the query params')
      return
    }

    const result = await MovementModel.getMovement({
      user: user.toLocaleString(),
      idMovement: id
    })

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(200).json(result)
  }

  static createMovement: ControllerFunction = async (req, res) => {
    const { user } = req.query
    const { typeMovement, description, amount } = req.body

    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a id on the query params')
      return
    }

    const result = await MovementModel.createMovement({
      user: user.toLocaleString(),
      typeMovement: Number(typeMovement),
      description,
      amount: Number(amount)
    })

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(200).json(result)
  }
}
