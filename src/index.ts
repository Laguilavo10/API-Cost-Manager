import express from 'express'
import { config as configEnv } from 'dotenv'
import session from 'express-session'

// import { balanceRouter } from './router/balance'
// import { movementRouter } from './router/movement'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'

configEnv()

const port = process.env.PORT ?? 3000

// middleware to parse json
console.log(process.env.GITHUB_CLIENT_ID)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj: any, done) {
  done(null, obj)
})

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      passReqToCallback: true
    },
    function (accessToken: any, refreshToken: any, _: any, profile: any, done: any) {
      console.log(accessToken)
      console.log(refreshToken)

      // asynchronous verification, for effect...
      // process.nextTick(function () {
      //   // To keep the example simple, the user's GitHub profile is returned to
      //   // represent the logged-in user.  In a typical application, you would want
      //   // to associate the GitHub account with a user record in your database,
      //   // and return that user instead.
      return done(null, profile)
      // })
    }
  )
)

const app = express()
app.use(express.json())
app.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialized: false })
)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (_, res) => {
  res.send('<a href="/auth/github/callback">Login<a/>')
})

app.get('/login', (_, res) => {
  res.send('login')
})

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github/error' }),
  function (_, res) {
    // Successful authentication, redirect home.
    res.redirect('/efardo')
  }
)
// app.use('/balance', balanceRouter)
// app.use('/movement', movementRouter)

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
  console.log(`Example app listening on port http://localhost:${port}`)
})
