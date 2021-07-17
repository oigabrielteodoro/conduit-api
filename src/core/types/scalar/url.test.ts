import { pipe } from 'fp-ts/function'
import { mapAllE } from '@/config/tests/fixtures'

import { urlCodec } from './url'

it('should valid url correctly', () => {
  pipe(
    'https://google.com',
    urlCodec.decode,
    mapAllE(result => expect(result).toBe('https://google.com')),
  )
})

it('should return error when url is invalid', () => {
  pipe(
    'invalid-url',
    urlCodec.decode,
    mapAllE(errors => {
      const errorMessage = Array.isArray(errors) ? errors[0]?.message : ''
      expect(errorMessage).toBe('Invalid URL')
    }),
  )
})
