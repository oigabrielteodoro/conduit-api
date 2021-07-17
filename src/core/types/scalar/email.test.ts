import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import { emailCodec } from './email'

it('should valid email correctly', () => {
  pipe(
    'johndoe@example.com',
    emailCodec.decode,
    E.map(result => expect(result).toBe('johndoe@example.com')),
  )
})

it('should return error when email is invalid', () => {
  pipe(
    'invalid-email',
    emailCodec.decode,
    E.mapLeft(error => expect(error[0]?.message).toBe('Invalid email')),
  )
})
