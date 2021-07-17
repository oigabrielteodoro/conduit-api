import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'

import { slugCodec } from './slug'

it('should valid slug correctly', () => {
  pipe(
    'valid-slug',
    slugCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('valid-slug')),
  )
})

it('should accept 3 or more characters', () => {
  pipe(
    'slu',
    slugCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('slu')),
  )
})

it('should not accept numbers at the beginning of the slug', () => {
  pipe(
    '3invalid-slug',
    slugCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid slug. Please, use alphanumeric characters, dash and/or numbers')),
  )
})

it('should not accept dashes at the end of the slug', () => {
  pipe(
    'invalid-slug-',
    slugCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid slug. Please, use alphanumeric characters, dash and/or numbers')),
  )
})

it('should not accept less than 3 characters', () => {
  pipe(
    'sl',
    slugCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid slug. Please, use alphanumeric characters, dash and/or numbers')),
  )
})
