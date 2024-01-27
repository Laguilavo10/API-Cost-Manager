import express from 'express'
import 'dotenv/config'
import { balanceRouter } from './router/balance'
import { movementRouter } from './router/movement'
import cors from 'cors'
import { validateAccessToken, decodeToken } from './middlewares/OAuth'
import { errorHandler } from './middlewares/error'
import { userRouter } from './router/user'
import { categoriesRouter } from './router/categories'

const port = process.env.PORT ?? 3000

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(validateAccessToken)
app.use(decodeToken)

// endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/user', userRouter)
app.use('/balance', balanceRouter)
app.use('/movement', movementRouter)
app.use('/categories', categoriesRouter)

// error handler
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
