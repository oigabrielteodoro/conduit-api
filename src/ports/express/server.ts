import express, { Request, Response } from 'express'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

import { CreateUser } from '@/core/types/user'
import { OutsideRegister } from '@/core/use-cases/user/register-user'

import { register } from '@/adapters/user/register-user-adapter'

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

type OutsideRegisterType = OutsideRegister<{ success: true, data: CreateUser }>

const outsideRegister: OutsideRegisterType = async (data) => {
  return {
    success: true,
    data,
  }
}

app.post('/api/users', async (request: Request, response: Response) => {
  return pipe(
    request.body.user,
    register(outsideRegister),
    TE.map(result => response.json(result)),
    TE.mapLeft(error => response.status(422).json(getError(error.message))),
  )()
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

function getError (errors: string) {
  return {
    errors: {
      body: errors.split(':::'),
    },
  }
}
