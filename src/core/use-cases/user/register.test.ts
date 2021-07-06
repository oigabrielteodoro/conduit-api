import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import { CreateUser } from '@/core/types/user'
import { register, OutsideRegister } from './register'

const mockedRegisterSuccess: OutsideRegister<string> = async (data) => {
  return `User ${data.username} registred with success`
}

const data: CreateUser = {
  username: 'johndoe',
  email: 'johndoe@example.com',
  password: 'john123',
}

it('should register user with success', async () => {
  return pipe(
    data,
    register(mockedRegisterSuccess),
    TE.map(result => expect(result).toBe(`User ${data.username} registred with success`)),
  )()
})
