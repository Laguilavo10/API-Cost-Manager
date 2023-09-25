import { BalanceModel } from '../model/balanceModel'
import type { ControllerFunction } from '../types'

export class BalanceController {
  static getBalance: ControllerFunction = async (req, res) => {
    const { user } = req.query

    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a user on the query params')
      return
    }

    const result = await BalanceModel.getCurrentBalance({
      user: user.toLocaleString()
    })

    if (result === null) {
      res.status(404).send('User not found')
      return
    }

    res.status(200).json(result)
  }
}
