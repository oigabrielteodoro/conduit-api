import { URL } from 'url'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { pipe, constFalse, constTrue } from 'fp-ts/function'
import * as E from 'fp-ts/Either'

type UrlBrand = {
  readonly Url: unique symbol
}

export const urlCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, UrlBrand> => isUrl(value),
    'Url',
  ),
  () => 'Invalid URL',
)

export type Url = t.TypeOf<typeof urlCodec>

function isUrl (value: unknown) {
  return pipe(
    E.tryCatch(
      () => new URL(typeof value === 'string' ? value : ''),
      E.toError,
    ),
    E.fold(constFalse, constTrue),
  )
}
