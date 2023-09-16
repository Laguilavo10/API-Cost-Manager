import express from 'express'
import { config } from 'dotenv'

config()

const app = express()
const port = process.env.PORT ?? 3000

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  // Start listening for requests.
  console.log(`Example app listening on port ${port}`)
})

app.post('/user', (req, res) => {
  console.log(req.body)
  res.send('POST request to the homepage')
})
