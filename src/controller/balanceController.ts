import { BalanceModel } from '../model/balanceModel'
import type { ControllerFunction } from '../types'

export class BalanceController {
  static getBalance: ControllerFunction = async (req, res) => {
    const user = req.user
    const { year, month } = req.query

    if (user === undefined || user === null) {
      res.status(404).send('Its necessary a id on the query params')
      return
    }

    const result = await BalanceModel.getBalance({
      month: Number(month),
      year: Number(year)
    })
    // console.log(result)

    res.status(200).json(result)
  }
}
