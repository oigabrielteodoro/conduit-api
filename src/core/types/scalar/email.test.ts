import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'

import { emailCodec } from './email'

it('should valid email correctly', () => {
  pipe(
    'johndoe@example.com',
    emailCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('johndoe@example.com')),
  )
})

it('should return error when email is invalid', () => {
  pipe(
    'invalid-email',
    emailCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid email')),
  )
})
