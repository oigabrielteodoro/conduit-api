import { pipe } from 'fp-ts/function'
import { mapAllE } from '@/config/tests/fixtures'

import { dateCodec } from './date'

it('should valid date correctly', () => {
  const date = new Date().toISOString()

  pipe(
    date,
    dateCodec.decode,
    mapAllE(result => expect(result).toBe(date)),
  )
})
