import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'

import { emailCodec } from './email'

it('should valid email correctly', async () => {
  return pipe(
    'johndoe@example.com',
    emailCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('johndoe@example.com')),
  )()
})

it('should return error when email is invalid', async () => {
  return pipe(
    'invalid-email',
    emailCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid email')),
  )()
})
