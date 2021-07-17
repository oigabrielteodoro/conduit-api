import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'

import { dateCodec } from './date'

it('should valid date correctly', async () => {
  const date = new Date().toISOString()

  return pipe(
    date,
    dateCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(date)),
  )()
})

it('should not accept a string different from date ISOString', async () => {
  return pipe(
    '10/10/2010',
    dateCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid date. Please use date.toISOString().')),
  )()
})
