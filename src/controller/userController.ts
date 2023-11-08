import { UserModel } from '../model/userModel'
import type { ControllerFunction } from '../types'

export class UserController {
  static registerNew: ControllerFunction = async (req, res) => {
    const { id, email, username, name } = req.body
    console.log(id.user.identities)
    if (username === undefined || name === undefined) {
      res.status(404).send('Missing parameters')
      return
    }
    const result = await UserModel.registerNew({
      id,
      email,
      username,
      name
    })
    console.log(result)
    if (result === null) {
      res.status(404).send('Cannot create user')
      return
    }

    res.status(200).json(result)
  }
}
