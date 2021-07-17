import { pipe } from 'fp-ts/function'

import { CreateUser } from '@/core/types/user'
import { mapAll, unsafeEmail, unsafeSlug, unsafePassword } from '@/config/tests/fixtures'

import { register, OutsideRegister } from './register'

const mockedRegisterSuccess: OutsideRegister<string> = async (data) => {
  return `User ${data.username} registred with success`
}

const data: CreateUser = {
  username: unsafeSlug('johndoe'),
  email: unsafeEmail('johndoe@example.com'),
  password: unsafePassword('john123'),
}

it('should register user with success', async () => {
  return pipe(
    data,
    register(mockedRegisterSuccess),
    mapAll(result => expect(result).toBe(`User ${data.username} registred with success`)),
  )()
})
