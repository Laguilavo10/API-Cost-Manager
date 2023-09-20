import express from 'express'
import { config } from 'dotenv'
import { balanceRouter } from './router/balance'

config()
const app = express()
const port = process.env.PORT ?? 3000

// middleware to parse json
app.use(express.json())

app.use('/balance', balanceRouter)
app.use('/movement', balanceRouter)

// app.get('/balance', async (req, res) => {
//   const { user } = req.params
//   // const result = await prisma.balance.findFirst({
//   //   where: {
//   //     userId: user
//   //   }
//   // })
//   // console.log(result)

//   // if (result === null) {
//   //   res.status(404).send('User not found')
//   //   return
//   // }

//   console.log(user)

//   res.send('Hello uwu!')
// })

// app.get('/:user/movement/:id', async (req, res) => {
//   const { user, id } = req.params

//   const movement = await prisma.movement.findUnique({
//     where: {
//       idMovement: id,
//       userId: user
//     }
//   })

//   res.send(movement)
// })

// app.post('/:user/movement', async (req, res) => {
//   console.log('entro')
//   const { user } = req.params
//   const { typeMovement, description, amount } = req.body
//   console.log(typeMovement, description, amount)

//   const movement = await prisma.movement.create({
//     data: {
//       typeId: typeMovement,
//       userId: user,
//       description,
//       value: amount
//     }
//   })

//   res.send(movement).status(201)
//   // res.send('hola')
// })

app.listen(port, () => {
  // Start listening for requests.
  console.log(`Example app listening on port ${port}`)
})
