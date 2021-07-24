import { pipe } from 'fp-ts/function'

import { CreateUser } from '@/core/types/user'
import { mapAll, unsafeEmail, unsafeSlug, unsafePassword } from '@/config/tests/fixtures'

import { register, OutsideRegister } from './register-user'

const mockedRegisterSuccess: OutsideRegister<string> = async (data) => {
  return `User ${data.username} registred with success`
}

const mockedRegisterFailure: OutsideRegister<never> = async () => {
  throw new Error('External Server Error')
}

const data: CreateUser = {
  username: unsafeSlug('johndoe'),
  email: unsafeEmail('johndoe@example.com'),
  password: unsafePassword('12345678'),
}

const dataWithWrongUsername: CreateUser = {
  username: unsafeSlug('a'),
  email: unsafeEmail('johndoe@example.com'),
  password: unsafePassword('12345678'),
}

const dataWithWrongEmailAndPassword: CreateUser = {
  username: unsafeSlug('johndoe'),
  email: unsafeEmail('johndoe'),
  password: unsafePassword('123456'),
}

it('should register user with success', async () => {
  return pipe(
    data,
    register(mockedRegisterSuccess),
    mapAll(result => expect(result).toBe(`User ${data.username} registred with success`)),
  )()
})

it('should not accept a register from a user with invalid username', async () => {
  return pipe(
    dataWithWrongUsername,
    register(mockedRegisterSuccess),
    mapAll(error => expect(error).toEqual(new Error('Invalid slug. Please, use alphanumeric characters, dash and/or numbers'))),
  )()
})

it('should not accept a register from a user with invalid email and/or password', async () => {
  return pipe(
    dataWithWrongEmailAndPassword,
    register(mockedRegisterSuccess),
    mapAll(error => expect(error).toEqual(new Error('Invalid email:::Password should be at least 8 characters.'))),
  )()
})

it('should return a Left if register function throws an error', async () => {
  return pipe(
    data,
    register(mockedRegisterFailure),
    mapAll(error => expect(error).toEqual(new Error('External Server Error'))),
  )()
})
