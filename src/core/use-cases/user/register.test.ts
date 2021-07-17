import { pipe } from 'fp-ts/function'

import { CreateUser } from '@/core/types/user'
import { mapAllTE, unsafeEmail } from '@/config/tests/fixtures'

import { register, OutsideRegister } from './register'

const mockedRegisterSuccess: OutsideRegister<string> = async (data) => {
  return `User ${data.username} registred with success`
}

const data: CreateUser = {
  username: 'johndoe',
  email: unsafeEmail('johndoe@example.com'),
  password: 'john123',
}

it('should register user with success', async () => {
  return pipe(
    data,
    register(mockedRegisterSuccess),
    mapAllTE(result => expect(result).toBe(`User ${data.username} registred with success`)),
  )()
})
