import { pipe } from 'fp-ts/function'
import { mapAllE } from '@/config/tests/fixtures'

import { emailCodec } from './email'

it('should valid email correctly', () => {
  pipe(
    'johndoe@example.com',
    emailCodec.decode,
    mapAllE(result => expect(result).toBe('johndoe@example.com')),
  )
})

it('should return error when email is invalid', () => {
  pipe(
    'invalid-email',
    emailCodec.decode,
    mapAllE(error => {
      const errorMessage = Array.isArray(error) ? error[0]?.message : ''
      expect(errorMessage).toBe('Invalid email')
    }),
  )
})
