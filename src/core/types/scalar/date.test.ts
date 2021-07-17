import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { mapAll } from '@/config/tests/fixtures'

import { dateCodec } from './date'

it('should valid date correctly', () => {
  const date = new Date().toISOString()

  pipe(
    date,
    dateCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(date)),
  )
})
