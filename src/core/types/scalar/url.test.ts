import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'

import { urlCodec } from './url'

it('should valid url correctly', () => {
  pipe(
    'https://google.com',
    urlCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('https://google.com')),
  )
})

it('should return error when url is invalid', () => {
  pipe(
    'invalid-url',
    urlCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid URL')),
  )
})
