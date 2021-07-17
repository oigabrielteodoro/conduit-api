import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'

import { passwordCodec } from './password'

it('should validate password properly', async () => {
  return pipe(
    '123456789',
    passwordCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('123456789')),
  )()
})

it('should not accept a password less than 8 characters long', async () => {
  return pipe(
    '12345',
    passwordCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Password should be at least 8 characters.')),
  )()
})
